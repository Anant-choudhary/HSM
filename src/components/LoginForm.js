import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";


let rendercount = 0
const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm();
  const {register,control,handleSubmit} = form;

  rendercount++;


  function passShowHandler() {
    setShowPassword((prev) => !prev);
  }

  //we find the function to be called when the button is pressed

  function Onsubmit(data){
    console.log("form submitted" , data)
  }

  return (
    
    <div className="bg-gray-50 font-sans">
        <h1>rendercount :  {rendercount}</h1>
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign in
            </h2>
            {/* this helps the on submit function automatically receive the form data on submit  */}
            <form onSubmit={(handleSubmit(Onsubmit))} className="mt-8 space-y-4">
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  id="username"
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600"
                  placeholder="Enter user name"
                  {...register("username")}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#bbb"
                  stroke="#bbb"
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>

              <div className="relative flex items-center">
                <input
                  name="password"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full text-gray-800 text-sm border border-gray-300 px-4 py-3 rounded-md outline-blue-600 pr-10"
                  placeholder="Enter password"
                  {...register('password')}
                />
                <span
                  onClick={passShowHandler}
                  className="absolute right-3 cursor-pointer text-gray-600"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...register('remember-me')}
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link to="/forgot">
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 hover:underline font-semibold"
                    >
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="submit"
                  className="w-full py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Sign in
                </button>
              </div>

              <p className="text-gray-800 text-sm mt-8 text-center">
                Don't have an account?
                <Link to="/register">
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                  >
                    Register here
                  </a>
                </Link>{" "}
              </p>
            </form>
            <DevTool control={control}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
