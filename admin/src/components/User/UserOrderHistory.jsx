import { useSelector } from "react-redux";
import NoOrder from "../../components";

export default function UserOrderHistory() {
  const { userHistory } = useSelector((state) => state.singleUser);
  if (userHistory.length === 0) {
    return <NoOrder />;
  }
  return (
    <>
      <div className=" dark:text-white  text-black  mt-10 ml-5 p-4 flex-1 w-full max-w-4xl max-h-fit font-serif ">
        <div className="flex flex-col p-1">
          <p className="font-bold  text-[20px] ">User Id :-</p>{" "}
          <p className="font-bold  text-[20px] ">Total Order :-</p>
          <p className="font-bold text-[20px]">Amount Spent :-</p>
        </div>

        <div className="flex m-4 bg-amber-500 rounded-lg p-2">
          <p className="flex-1">Order Id :</p>
          <p className="flex-1 font-bold">Amount</p>
          <p className="flex-1 font-bold">DATE </p>
        </div>
        <div className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 dark:text-black  text-white flex items-center">
          <a href="/order/:orderId" className="flex-1 font-bold">
            ORDER ID
          </a>
          <p className="flex-1">Nameassssss ssssssssssssssss </p>
          <p className="flex-1">Date</p>
        </div>
      </div>
    </>
  );
}
