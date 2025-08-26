import React, { useEffect } from "react";
import Logo from "../Logo";
import { FaClipboardList } from "react-icons/fa6";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchHistory } from "../../store/historySlice";

export default function NoOrder() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);
  const history = () => {
    navigate("/user-history");
  };
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage pt-20 pb-10 px-4">
      <div className="flex  flex-col items-center justify-center">
        <Logo className={"h-25 w-25"} />
        <div className="flex flex-row items-center justify-center text-2xl">
          <FaClipboardList className="dark:text-white mr-4 " />
          <p className="font-semibold dark:text-white">No orders yet...</p>
        </div>
        <Button className="mt-10" onClick={() => history()}>
          View History
        </Button>
      </div>
    </div>
  );
}
