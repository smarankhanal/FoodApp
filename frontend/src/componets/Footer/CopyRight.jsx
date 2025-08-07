import React from "react";

export default function CopyRight() {
  return (
    <aside className="text-center text-sm text-black dark:text-gray-600 font-semibold">
      © {new Date().getFullYear()} - All rights reserved by Food Private Ltd.
    </aside>
  );
}
