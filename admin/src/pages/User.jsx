import React, { useEffect } from "react";
import { Search, SingleUser } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";

export default function User() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const { users } = useSelector((state) => state.user);
  return (
    <div className="dark:text-white text-black mt-10 ml-5 p-6 flex-1 w-full max-w-5xl font-serif">
      <Search />

      <div className="flex justify-between items-center mt-6 mb-4">
        <p className="font-bold text-lg ">Total Users: </p>
        <p className="font-bold text-lg">Active Users:</p>
      </div>

      <div className="grid grid-cols-5 gap-4 m-4 bg-amber-500 rounded-lg px-4 py-3 font-bold text-black items-center shadow">
        <p>USER ID</p>
        <p>USER-NAME</p>
        <p>STATUS</p>
        <p>DATE</p>
        <div className="text-right">
          <select
            className="border rounded px-2 py-1 text-sm outline-none cursor-pointer dark:bg-black bg-white"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="name_as">Active</option>
            <option value="name_desc">No Active</option>
            <option value="price_asc">Date ↑</option>
            <option value="price_desc">Date ↓</option>
          </select>
        </div>
      </div>

      {users?.map((user) => (
        <SingleUser key={user._id} user={user} />
      ))}
    </div>
  );
}
