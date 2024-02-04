import { useState } from "react";
import Api from "../src/components/Api";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Homepage() {
  return (
    <>
      <ToastContainer />
      <Api />
    </>
  );
}
