import Api from "../src/components/Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage() {
  return (
    <>
      {/* <button onClick={notify}>Notify</button> */}
      <ToastContainer />
      <Api />
    </>
  );
}
