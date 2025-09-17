import React, { useState } from "react";
import { TiUserDelete } from "react-icons/ti";
import { FaClipboardList } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Status from "../Status";
import {
  deleteUser,
  fetchSingleUser,
  fetchUserHistory,
} from "../../store/singleUserSlice";
import { fetchUsers } from "../../store/userSlice";
import { Toast } from "../../components";

export default function SingleUser({ user }) {
  const [toast, setToast] = useState({ show: false, text: "", className: "" });
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const viewUser = async (userId) => {
    try {
      await dispatch(fetchSingleUser(userId)).unwrap();
      navigate(`/user-details/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTheUser = async (userId) => {
    try {
      await dispatch(deleteUser(userId)).unwrap();
      setToast({
        show: true,
        text: "Deleting the user...",
        className: "text-green-500",
      });

      setTimeout(() => {
        setToast({ show: false, text: "", className: "" });
        dispatch(fetchUsers());
      }, 2000);
    } catch (error) {
      setToast({
        show: true,
        text: error.message || "Failed to delete user",
        className: "text-red-500",
      });

      setTimeout(() => {
        setToast({ show: false, text: "", className: "" });
      }, 2000);
    }
  };

  const userHistory = async (userId) => {
    try {
      await dispatch(fetchUserHistory(userId)).unwrap();
      navigate(`/user-history/${userId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {toast.show && (
        <Toast
          show={toast.show}
          text={toast.text}
          className={toast.className}
        />
      )}

      {confirmOpen && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50 cursor-not-allowed">
          <div className="bg-white p-6 rounded-xl shadow-lg text-center max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this user?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  deleteTheUser(user._id);
                  setConfirmOpen(false);
                }}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 bg-black dark:bg-white rounded-lg m-4 p-2 gap-2 dark:text-black  text-white flex sm:flex-row  flex-col sm:items-center opacity-85 font-serif">
        <p className="flex-1 text-sm sm:truncate ">{user._id}</p>
        <p className="flex-1 sm:ml-5">{user.username} </p>
        <div className="flex-1">
          <Status
            className={
              user.isActive === true
                ? "text-green-500 drop-shadow-[2px_2px_green]"
                : "text-orange-500 drop-shadow-[2px_2px_orange]"
            }
          >
            {user.isActive === true ? "Active" : "In Active"}
          </Status>
        </div>

        <p className="flex-1">
          {new Date(user.createdAt).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        <div className="flex flex-1">
          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03] mr-3"
            title="User History"
            onClick={() => userHistory(user._id)}
          >
            <FaClipboardList className=" text-[18px] text-amber-500" />
          </div>

          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03]"
            title="Delete User"
            onClick={() => setConfirmOpen(true)}
          >
            <TiUserDelete className="text-red-600 text-[18px]" />
          </div>

          <div
            className="bg-white dark:bg-black h-[23px] w-[23px] rounded-full flex items-center justify-center hover:cursor-pointer hover:scale-[1.03] ml-3"
            title="View user details"
            onClick={() => viewUser(user._id)}
          >
            <FaRegEye className="text-blue-600 text-[18px]" />
          </div>
        </div>
      </div>
    </>
  );
}
