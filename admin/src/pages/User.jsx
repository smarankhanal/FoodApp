import React, { useEffect } from "react";
import { Search, SingleUser } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import SkeletonLoader from "../components/SkeletonLoader";
export default function User() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { users, loading } = useSelector((state) => state.user);
  if (loading)
    return (
      <div className="dark:text-white text-black mt-10 ml-5 p-6 flex-1 w-full max-w-5xl font-serif">
        <div className="flex justify-between">
          <SkeletonLoader
            count={1}
            width={200}
            height={30}
            className="mb-4 opacity-50"
            baseColor="#000"
            highlightColor="#333"
          />
          <SkeletonLoader
            count={1}
            width={200}
            height={30}
            className="mb-4 opacity-50 rounded-lg"
            baseColor="#000"
            highlightColor="#333"
          />
        </div>
        <SkeletonLoader
          count={1}
          width="100%"
          height={40}
          className="mb-2 opacity-50"
          baseColor="#000"
          highlightColor="#333"
        />

        <SkeletonLoader
          count={5}
          width="100%"
          height={50}
          baseColor="#000"
          highlightColor="#333"
          className="opacity-50"
        />
      </div>
    );
  return (
    <div className="dark:text-white text-black mt-10 ml-5 p-6 flex-1 w-full max-w-5xl font-serif">
      <Search />

      <div className="flex justify-between items-center mt-6 mb-4">
        <p className="font-bold text-lg ">Total Users: {users.length} </p>
        <p className="font-bold text-lg">
          Active Users:{" "}
          <span className="text-green-500">
            {users.filter((u) => u.isActive).length}
          </span>
        </p>
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
