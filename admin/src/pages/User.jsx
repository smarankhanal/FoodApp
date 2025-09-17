import React, { useEffect, useState } from "react";
import { Search, SingleUser } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/userSlice";
import SkeletonLoader from "../components/SkeletonLoader";
export default function User() {
  const dispatch = useDispatch();
  const [sortedUsers, setSortedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const { users, loading } = useSelector((state) => state.user);
  useEffect(() => {
    setSortedUsers(users);
  }, [users]);
  const handleSortChange = (value) => {
    let sorted = [...users];
    if (value === "active") {
      sorted = sorted.filter((o) => o.isActive === true);
    } else if (value === "inactive") {
      sorted = sorted.filter((o) => o.isActive === false);
    } else if (value === "price_asc") {
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (value === "price_desc") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setSortedUsers(sorted);
  };
  const filteredUser = sortedUsers.filter(
    (user) =>
      user.username?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user._id?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading)
    return (
      <div className="dark:text-white text-black mt-10 ml-5 p-6  w-full max-w-5xl ">
        <div className="flex justify-between">
          <SkeletonLoader
            count={1}
            width="100%"
            height={30}
            className="mb-4 opacity-50"
            baseColor="#000"
            highlightColor="#333"
          />
          <SkeletonLoader
            count={1}
            width="100%"
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
      <Search
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="flex  sm:flex-row flex-col sm:justify-between sm:items-center mt-6 mb-4">
        <p className="font-bold text-lg ">Total Users: {users.length} </p>
        <p className="font-bold text-lg">
          Active Users:
          <span className="ml-3 text-green-500">
            {sortedUsers.filter((u) => u.isActive).length}
          </span>
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:grid sm:grid-cols-5 sm:gap-4 m-4 bg-amber-500 rounded-lg px-4 py-3 font-bold text-black sm:items-center shadow">
        <p>USER ID</p>
        <p>USER-NAME</p>
        <p>STATUS</p>
        <p>DATE</p>
        <div className="text-right">
          <select
            className="border rounded px-2 py-1 text-sm outline-none cursor-pointer dark:bg-black bg-white"
            onChange={(e) => handleSortChange(e.target.value)}
          >
            <option value="">Sort/Filter</option>
            <option value="active">Active</option>
            <option value="inactive">In Active</option>
            <option value="price_asc">Date ↑</option>
            <option value="price_desc">Date ↓</option>
          </select>
        </div>
      </div>

      {filteredUser?.map((user) => (
        <SingleUser key={user._id} user={user} />
      ))}
    </div>
  );
}
