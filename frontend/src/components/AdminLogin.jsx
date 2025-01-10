import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseURL from "../utils/baseUrl";

const Login = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data)
    try {
        const response = await axios.post(`${getBaseURL()}/api/auth/admin`, data, {
            headers: {
                'Content-Type' : 'application/json',
            }
        })
        const auth = response.data;
        console.log(auth)
        if (auth.token) {
            localStorage.setItem("token", auth.token);
            setTimeout(() => {
                localStorage.removeItem('token');
                alert('Token has been expired, Please login again.')
                navigate("/")
            }, 3600 * 1000)
        }
        alert('Admin Login successful')
        navigate("/dashboard")

    } catch (error) {
      setMessage("Please provide a valid email and password")
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-9 mb-4">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>

            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div>
            <button className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold px-8 rounded focus:outline-none">
              Login
            </button>
          </div>
        </form>

        
        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Login;