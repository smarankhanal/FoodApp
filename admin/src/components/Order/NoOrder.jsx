import Logo from "../Logo";
import { FaClipboardList } from "react-icons/fa6";
import Button from "../Button";

export default function NoOrder() {
  return (
    <div className="bg-[url('/images/light.jpg')] dark:bg-[url('/images/dark.jpg')] bgImage items-center mx-auto">
      <div className="flex flex-col items-center justify-center text-center">
        <Logo className="h-25 w-25 mb-6" />

        <div className="flex flex-row items-center justify-center text-2xl mb-4">
          <FaClipboardList className="dark:text-white mr-4" />
          <p className="font-semibold dark:text-white">No orders yet...</p>
        </div>

        <Button className="mt-6 bg-black text-white">View History</Button>
      </div>
    </div>
  );
}
