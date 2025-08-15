import React, { useEffect, useState } from "react";

export default function Toast() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 w-[200px] px-4 py-2 rounded-lg shadow-lg font-bold 
      text-red-500 dark:bg-white bg-black transition-all duration-500
      ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      Order Success
    </div>
  );
}
