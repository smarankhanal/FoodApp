import React from "react";
import Sidebar from "../components/SideBar/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Dashboard
          </h1>
          <button className="bg-black text-white px-4 py-1 rounded dark:bg-white dark:text-black">
            Logout
          </button>
        </header>

        {/* Content */}
        <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example Cards */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Total Users
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              124
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Orders Today
            </h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-200">
              58
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Revenue
            </h2>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              $1,230
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
