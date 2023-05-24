import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Notification = () => {
  return <ToastContainer position="top-right" autoClose={3000} />;
};
