import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTheme } from "../utils/ThemeContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import { redirect } from "react-router-dom";

const Basic = () => {
  const { theme } = useTheme();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log("userInfo: ", userInfo);
  const [isSignin, setIsSignin] = useState(true);
  useEffect(() => {
    setUserInfo;
  });
  const handleIsSignIn = () => {
    setIsSignin(!isSignin);
  };
  return isSignin ? (
    <section
      className={`${
        theme === "dark" && "bg-[#23272F] text-white"
      } w-full min-h-screen flex justify-center items-center`}
    >
      <div
        className={`${
          theme === "dark" && "bg-[#16181D]"
        } px-12 py-16 rounded-lg`}
      >
        <h1 className="mb-12 text-3xl font-bold">Register here</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (
              !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                values.password
              )
            ) {
              errors.password = "Invalid password";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            async function addUser() {
              try {
                const addUser = await createUserWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                );

                setUserInfo(result);
              } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
              }
            }
            addUser();
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  className={`${
                    theme === "dark" && "text-black"
                  } p-2 rounded my-2`}
                  placeholder="enter a valid email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 text-xs"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  className={`${
                    theme === "dark" && "text-black"
                  } p-2 rounded my-2`}
                  placeholder="enter a strong password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>
              <Link onClick={handleIsSignIn}>
                <span>Already a user?</span>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  theme === "dark" && "bg-[#23272F]"
                } p-2 rounded-full my-4`}
              >
                {!isSubmitting ? "Submit" : "Submitting..."}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  ) : (
    <section
      className={`${
        theme === "dark" && "bg-[#23272F] text-white"
      } w-full min-h-screen flex justify-center items-center`}
    >
      <div
        className={`${
          theme === "dark" && "bg-[#16181D]"
        } px-12 py-16 rounded-lg`}
      >
        <h1 className="mb-12 text-3xl font-bold">Sign in</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            if (!values.password) {
              errors.password = "Required";
            } else if (
              !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
                values.password
              )
            ) {
              errors.password = "Invalid password";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            async function checkUser() {
              try {
                const getUser = await signInWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                );
                const result = getUser;
                console.log("result: ");
                setUserInfo(result); // Move this line here
                console.log(userInfo);
                setSubmitting(false);
                navigate("/");
              } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
              }
            }
            checkUser();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div>
                <Field
                  type="email"
                  name="email"
                  className={`${
                    theme === "dark" && "text-black"
                  } p-2 rounded my-2`}
                  placeholder="enter a valid email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-400 text-xs"
                />
              </div>
              <div>
                <Field
                  type="password"
                  name="password"
                  className={`${
                    theme === "dark" && "text-black"
                  } p-2 rounded my-2`}
                  placeholder="enter a strong password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400 text-sm"
                />
              </div>
              <Link onClick={handleIsSignIn}>
                <span>new user?</span>
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  theme === "dark" && "bg-[#23272F]"
                } p-2 rounded-full my-4`}
              >
                {!isSubmitting ? "Submit" : "Submitting..."}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default Basic;
