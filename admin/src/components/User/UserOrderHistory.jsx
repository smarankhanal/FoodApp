import { useDispatch, useSelector } from "react-redux";
import { NoOrder, Status } from "../../components";
import Button from "../Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCapitalize } from "../../hooks/useCapitalize";
import { fetchSingleOrder } from "../../store/singleOrderSlice";
import { useState, useEffect } from "react";

export default function UserOrderHistory() {
  const capitalize = useCapitalize();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortedOrders, setSortedOrders] = useState([]);

  const { loading, userHistory } = useSelector((state) => state.singleUser);
  const { userId } = useParams();

  const totalPrice = userHistory.reduce(
    (sum, order) => sum + Number(order.totalPrice || 0),
    0
  );

  const viewOrder = async (userId, orderId) => {
    await dispatch(fetchSingleOrder({ userId, orderId })).unwrap();
    navigate(`/order-details/user=${userId}/order=${orderId}`);
  };

  const statusColors = {
    pending: "text-orange-500 drop-shadow-[2px_2px_orange]",
    cancelled: "text-red-500 drop-shadow-[2px_2px_red]",
    completed: "text-green-500 drop-shadow-[2px_2px_green]",
  };

  useEffect(() => {
    setSortedOrders(userHistory);
  }, [userHistory]);

  const handleSortChange = (value) => {
    let sorted = [...userHistory];

    if (value === "pending")
      sorted = sorted.filter((o) => o.status === "pending");
    else if (value === "completed")
      sorted = sorted.filter((o) => o.status === "completed");
    else if (value === "cancelled")
      sorted = sorted.filter((o) => o.status === "cancelled");
    else if (value === "date_asc")
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    else if (value === "date_desc")
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    else if (value === "amount_asc")
      sorted.sort((a, b) => a.totalPrice - b.totalPrice);
    else if (value === "amount_desc")
      sorted.sort((a, b) => b.totalPrice - a.totalPrice);

    setSortedOrders(sorted);
  };

  if (loading) return null;

  return (
    <>
      {userHistory.length === 0 ? (
        <NoOrder />
      ) : (
        <div className="dark:text-white text-black mt-10 sm:ml-5 p-4 flex-1 w-full max-w-4xl font-serif">
          <div className="p-4 font-serif dark:bg-neutral-900 rounded-lg space-y-2">
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              User:{" "}
              <span className="font-bold text-blue-600 dark:text-blue-400 sm:ml-2 text-[14px]">
                {userId}
              </span>
            </p>
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              Total Orders:{" "}
              <span className="font-bold text-green-600 dark:text-green-400 ml-2">
                {userHistory.length}
              </span>
            </p>
            <p className="font-semibold text-lg text-gray-800 dark:text-gray-200">
              Amount Spent:{" "}
              <span className="font-bold text-red-600 dark:text-red-400 ml-2">
                Rs {totalPrice}
              </span>
            </p>
          </div>

          <div className="flex m-4 bg-amber-500 rounded-lg p-2 sm:flex-row flex-col gap-2">
            <p className="flex-1 font-bold">Order Id</p>
            <p className="flex-1 font-bold">Amount</p>
            <p className="flex-1 font-bold">Date</p>
            <div className="flex-1 flex justify-between items-center">
              <p className="font-bold">Status</p>
              <select
                className="border rounded font-bold text-sm outline-none cursor-pointer dark:bg-black bg-white"
                onChange={(e) => handleSortChange(e.target.value)}
              >
                <option value="">Sort/Filter</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="date_asc">Date ↑</option>
                <option value="date_desc">Date ↓</option>
                <option value="amount_asc">Amount ↑</option>
                <option value="amount_desc">Amount ↓</option>
              </select>
            </div>
          </div>

          {sortedOrders.map((order) => (
            <div
              className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black text-white flex flex-col sm:flex-row gap-2 sm:items-center"
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
              <div className="flex-1 flex flex-col sm:flex-row gap-2">
                <Status className={statusColors[order?.status]}>
                  {capitalize(order.status)}
                </Status>
                <Button
                  className="bg-white text-black dark:bg-black dark:text-white"
                  onClick={() => viewOrder(userId, order._id)}
                >
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
