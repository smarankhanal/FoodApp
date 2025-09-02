import { useSelector } from "react-redux";
import { NoOrder, Status } from "../../components";
import Button from "../Button";
import { useParams } from "react-router-dom";
import { useCapitalize } from "../../hooks/useCapitalize";
export default function UserOrderHistory() {
  const captialize = useCapitalize();
  const { userHistory } = useSelector((state) => state.singleUser);
  const { userId } = useParams();
  const totalPrice = userHistory.reduce(
    (sum, order) => sum + Number(order.totalPrice || 0),
    0
  );

  return (
    <>
      {userHistory.length === 0 ? (
        <NoOrder />
      ) : (
        <div className=" dark:text-white  text-black  mt-10 ml-5 p-4 flex-1 w-full max-w-4xl max-h-fit font-serif ">
          <div>
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
              User Id:
              <span className="font-bold text-blue-600 dark:text-blue-400 ml-2">
                {userId}
              </span>
            </p>
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200 mb-2">
              Total Orders:
              <span className="font-bold text-green-600 dark:text-green-400 ml-2">
                {userHistory.length}
              </span>
            </p>
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              Amount Spent:
              <span className="font-bold text-red-600 dark:text-red-400 ml-2">
                Rs {totalPrice}
              </span>
            </p>
          </div>
          <div className="flex m-4 bg-amber-500 rounded-lg p-2">
            <p className="flex-1">Order Id </p>
            <p className="flex-1 font-bold">Amount</p>
            <p className="flex-1 font-bold">DATE </p>
            <div className="flex-1">
              <p className="font-bold">Status</p>
              <p></p>
            </div>
          </div>
          {userHistory.map((order) => (
            <div
              className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black  text-white flex items-center"
              key={order._id}
            >
              <p className="flex-1 truncate text-sm">{order._id}</p>
              <p className="flex-1 ml-2">Rs {order.totalPrice}</p>
              <p className="flex-1">
                {new Date(order.createdAt).toLocaleString("en-us", {
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div className="flex-1 flex">
                <Status className="text-orange-400 drop-shadow-[2px_2px_orange]">
                  {captialize(order.status)}
                </Status>
                <Button className="bg-white text-black dark:bg-black dark:text-white">
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
