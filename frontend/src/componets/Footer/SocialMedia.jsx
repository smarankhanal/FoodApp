import React from "react";
import { FaFacebook, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function SocialMedia() {
  return (
    <div className="flex align-center justify-center">
      <div className="flex gap-3 mt-2">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebook className="text-black dark:text-gray-600 hover:text-blue-600 text-xl" />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaXTwitter className=" text-xl" />
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="text-black dark:text-gray-600 hover:text-pink-500 text-xl" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="text-black dark:text-gray-600 hover:text-blue-700 text-xl" />
        </a>
      </div>
    </div>
  );
}
