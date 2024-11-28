"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { loginValidation } from "../utiles/authValidations";
import { Input, Error } from "../components/form";
import { OverlayLoading } from "../components/ui";
import { useLoginMutation } from "../../redux/services/authService";
import {
  setIsUser,
  setToken,
  setRole,
  setUserInfo,
} from "../../redux/reducers/authReducer";
import { setToStorage } from "@/app/utiles/common";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isUser } = useSelector((state) => state.authReducer);
  const [submitLogin, response] = useLoginMutation();
  const { isError, isLoading, isSuccess, data, error } = response;
  // console.log("User login response", data);
  const initialValues = {
    email: "",
    password: "",
  };

  useEffect(() => {
    if (isUser) {
      router.push("/dashboard");
    }
  }, [isUser]);

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const { name, email, phone_number, designation, role, status, roles } =
        data?.user;
      setToStorage("user_token", data.token);
      dispatch(setToken(data.token));
      dispatch(setIsUser(true));
      setToStorage("user_type", role);
      dispatch(setRole(role));
      setToStorage(
        "userInfo",
        JSON.stringify({
          name,
          email,
          phone_number,
          designation,
          status,
          roles,
        })
      );
      dispatch(
        setUserInfo({ name, email, phone_number, designation, status, roles })
      );
      router.push("/dashboard");
      toast.success(response?.data?.message);
    }
    if (isError) {
      toast.error(response?.error?.data?.message || "Something has wrong!");
    }
  }, [response]);

  const onSubmit = async () => {
    // submitLogin({
    //   email: values.email,
    //   password: values.password,
    // });
    setToStorage("user_token", "_Lafd#9wmdsa0dfa#dfafd");
    dispatch(setToken("_Lafd#9wmdsa0dfa#dfafd"));
    dispatch(setIsUser(true));
    setToStorage("user_type", "admin");
    dispatch(setRole("admin"));
  };

  const formik = useFormik({
    initialValues,
    validationSchema: loginValidation,
    onSubmit,
  });

  const { handleChange, handleBlur, handleSubmit, values, errors } = formik;

  return (
    <>
      {isLoading && <OverlayLoading />}
      <div className="flex min-h-screen flex-1">
        <div className="min-h-screen flex flex-1 flex-col justify-center px-4 py-10 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto h-full w-full flex flex-1 flex-col justify-center max-w-sm lg:w-96">
            {/* <img
              className="h-auto w-52"
              src="/images/zeezsoft.png"
              alt="logo"
            /> */}
            <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign in to your account
            </h2>

            <div className="mt-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username or Email
                  </label>
                  <div className="mt-2">
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      isError={errors.email && formik.touched.email}
                    />
                    {errors.email && formik.touched.email && (
                      <Error value={errors.email} />
                    )}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <div className="mt-2">
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                      isError={errors.password && formik.touched.password}
                    />
                    {errors.password && formik.touched.password && (
                      <Error value={errors.password} />
                    )}
                  </div>
                </div>

                <div className="!mt-10">
                  <button type="submit" className="buttonPrimary">
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="w-full flex items-center justify-center text-sm text-gray-500">
            Designed and develop by&nbsp;
            <a
              href="https://zeezsoft.com"
              target="_blank"
              className="text-indigo-600 font-medium"
            >
              ZEEZSOFT
            </a>
          </div> */}
        </div>
        <div className="bg-gray-50 relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="/images/poster.webp"
            alt=""
          />
        </div>
      </div>
    </>
  );
}
