import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCapitalize } from "../../hooks/useCapitalize";
import { Button } from "../../components";
import { cancelUserOrder } from "../../store/updateStatusSlice";
import SkeletonLoader from "../../components/SkeletonLoader";

export default function SingleOrderHistory() {
  const statusColor = {
    pending: "text-yellow-500 bg-yellow-100",
    completed: "text-green-600 bg-green-100",
    cancelled: "text-red-600 bg-red-100",
  };

  const dispatch = useDispatch();
  const { singleHistory, loading } = useSelector((state) => state.history);
  const capitalize = useCapitalize();
  const [confirmBox, setConfirmBox] = useState(null);

  const handleCancelClick = (orderId) => {
    setConfirmBox(orderId);
  };

  const confirmCancellation = async () => {
    if (confirmBox) {
      await dispatch(cancelUserOrder(confirmBox)).unwrap();
      setConfirmBox(null);
    }
  };
  const { order } = useSelector((state) => state.cancelOrder);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <SkeletonLoader width="80%" height={40} className="text-center" />
        <SkeletonLoader width="80%" height={50} className="text-center" />
        <SkeletonLoader width="20%" height={40} className="text-right" />

        <div className="w-full max-w-5xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkeletonLoader width="70%" height={200} />
          <SkeletonLoader width="70%" height={200} />
        </div>
      </div>
    );
  }

  return (
    <>
      {confirmBox && (
        <div className="fixed inset-0 backdrop-blur-sm flex justify-center items-center z-50 cursor-not-allowed">
          <div className="bg-gray-100 dark:bg-black max-w-sm w-full text-center rounded-lg p-4">
            <h2 className="font-bold pb-4 dark:text-white">
              Do you want to cancel the order?
            </h2>
            <div className="flex justify-center gap-5">
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={confirmCancellation}
              >
                Yes
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600"
                onClick={() => setConfirmBox(null)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bg-cover min-h-screen pt-20 px-4 font-serif">
        <div className="w-full max-w-4xl mx-auto mb-10">
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 bg-amber-500 text-white font-semibold text-center py-3 text-[15px]">
              <p>Order Id</p>
              <p>Date</p>
              <p>Status</p>
              <p>Total Price</p>
            </div>
            <div className="grid grid-cols-4 items-center text-center py-4 px-2 text-sm sm:text-base dark:text-gray-200">
              <p className="truncate">{singleHistory?._id}</p>
              <p>
                {new Date(singleHistory?.createdAt).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </p>
              <p
                className={`font-semibold rounded-lg px-2 py-1 text-sm inline-block ${
                  statusColor[order?.status || singleHistory?.status]
                }`}
              >
                {capitalize(order?.status || singleHistory?.status)}
              </p>
              <p className="text-green-600 font-bold">
                Rs {singleHistory?.totalPrice}
              </p>
            </div>
          </div>
        </div>

        <div className="float-right sm:mr-30 mr-4 mb-4">
          {singleHistory.status.toLowerCase() === "pending" && (
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => handleCancelClick(singleHistory._id)}
            >
              Cancel Order
            </Button>
          )}
        </div>

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {singleHistory.foodItems?.map((item) => (
            <div
              key={item._id}
              className="flex gap-4 dark:bg-white bg-gray-900 text-white dark:text-black rounded-xl shadow-lg overflow-hidden hover:scale-[1.01] transition-transform duration-200"
            >
              <img
                src={item.foodItem.foodImage}
                alt={item.foodItem.foodName}
                className="h-40 w-40 object-cover rounded-l-xl"
              />
              <div className="flex flex-col justify-between py-3 pr-4">
                <div>
                  <p className="text-lg font-bold text-amber-500">
                    {capitalize(item.foodItem.foodName)}
                  </p>
                  <p className="text-sm font-semibold">
                    Sub-category:{" "}
                    <span className="text-amber-600">
                      {capitalize(item.foodItem.subCategory)}
                    </span>
                  </p>
                  <p className="text-sm opacity-70 mt-1">
                    {item.foodItem.description}
                  </p>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="font-semibold">
                    Type:{" "}
                    <span
                      className={
                        item.foodItem.type?.toLowerCase() === "veg"
                          ? "text-green-500"
                          : "text-red-500"
                      }
                    >
                      {capitalize(item.foodItem.type)}
                    </span>
                  </p>
                  <p className="text-sm font-semibold opacity-70">
                    Quantity: {item.quantity}
                  </p>
                  <p className="font-bold text-lg text-blue-600">
                    Rs {item.foodItem.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
