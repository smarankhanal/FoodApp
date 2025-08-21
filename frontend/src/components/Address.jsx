import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Address() {
  return (
    <div className="w-full max-w-3xl mx-auto my-20 flex flex-col items-center justify-center bg-[url('/images/lightBg.jpg')] dark:bg-[url('/images/darkBg.jpg')] bg-cover bg-no-repeat dark:opacity-80 rounded-lg shadow-lg w-[350px] h-[300px] p-6 text-center">
      <FaMapMarkerAlt className="text-orange-500 text-4xl mb-3" />
      <h2 className="text-xl font-bold mb-2"> Address</h2>
      <p className="opacity-80 dark:text-white">
        Bharatpur-10, Chitwan <br />
        Nepal
      </p>
      <a
        href="https://www.google.com/maps?q=Bharatpur-10,Chitwan"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow transition duration-200"
      >
        View on Google Maps
      </a>
    </div>
  );
}
