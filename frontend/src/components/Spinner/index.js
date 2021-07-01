import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="flex h-screen">
      <FaSpinner size={36} className="m-auto animate-spin" />
    </div>
  );
}
