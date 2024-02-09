import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useTheme } from "../utils/ThemeContext";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../utils/AuthContext";
import * as Yup from "yup";

const Basic = () => {
  const { theme } = useTheme();
  const { userInfo, setUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSignin, setIsSignin] = useState(true);

  const SignUpSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too short")
      .max(70, "Too long")
      .required("Required"),
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .min(8, "Password must contain atleast \n8 characters.")
      .matches(/[a-zA-Z]/, "Password can only contain\nLatin letters.")
      .required("Required"),
  });

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Required"),
    password: Yup.string()
      .required("Invalid email address or password")
      .required("Required"),
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
        } px-20 py-16 rounded-lg`}
      >
        <h1 className="mb-12 text-3xl font-bold">Register here</h1>
        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={(values, { setSubmitting }) => {
            async function addUser() {
              try {
                const addUser = await createUserWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                );
                const updateUser = await updateProfile(auth.currentUser, {
                  displayName: values.name,
                });

                navigate("/");
              } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("sign up error: ", errorMessage);
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
                  type="name"
                  name="name"
                  className={`${
                    theme === "dark" && "text-black"
                  } p-2 rounded my-2`}
                  placeholder="enter your full name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-red-400 text-xs"
                />
              </div>
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
                  } p-2 rounded my-2 `}
                  placeholder="enter a strong password"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-400 text-xs whitespace-pre-wrap"
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
          validationSchema={SigninSchema}
          onSubmit={(values, { setSubmitting }) => {
            async function checkUser() {
              try {
                const getUser = await signInWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                );

                setSubmitting(true);
                navigate("/");
              } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(typeof errorCode);
                if (errorCode === "auth/invalid-credential") {
                }
                setSubmitting(false);
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
                  className="text-red-400 text-xs"
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
