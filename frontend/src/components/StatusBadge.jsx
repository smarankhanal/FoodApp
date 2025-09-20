export default function StatusBadge({ status, className = "" }) {
  const statusStyles = {
    Pending: {
      text: "text-green-500",
      shadow: "shadow-[4px_4px_2px_green]",
    },
    Completed: {
      text: "text-orange-500",
      shadow: "shadow-[4px_4px_2px_orange]",
    },
    Cancelled: {
      text: "text-red-500",
      shadow: "shadow-[4px_4px_2px_red]",
    },
  };

  return (
    <div
      className={`text-[20px]  h-[30px] w-[180px] 
                  dark:bg-black bg-white rounded-lg 
                  ${statusStyles[status]?.shadow || ""} ${className}`}
    >
      <p
        className={`text-center font-bold ${statusStyles[status]?.text || ""}`}
      >
        {status}
      </p>
    </div>
  );
}
