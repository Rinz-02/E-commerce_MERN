import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authContext } from "../context/AuthProvider";
import { Toaster, toaster } from "../components/ui/toaster";

function Login() {
  const { login,authenticated,loading } = useContext(authContext);

  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/login", {
        user: user,
        password: password,
      });
      if (res.data.success) {
        login({
          token: res.data.token,
          role: res.data.role,
        });
         navigate(res.data.role === 'admin' ? '/admin' : '/');
     
      } else {
        toaster.create({
          titile : "Error",
          type : "error",
          description : res.data.message
        })
      }
      
    } catch (err) {
      console.log("login Fail");
    }
    
  };

  return (
    <div className="flex flex-col container mx-auto  items-center">
      <div
        className={`flex flex-col container mx-auto w-2/3 md:w-1/2  p-4 rounded-xl mt-28 bg-gray-300 shadow-lg items-center  bg-opacity-55`}
      >
        <div className="w-full">
          <p className="mb-3">User Name</p>
          <input
            placeholder="Enter User Name"
            className="p-3 mb-4 rounded-xl w-full bg-gray-300 bg-opacity-60 text-white"
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="w-full">
          <p className="mb-3">Password</p>
          <input
            placeholder="Enter Password"
            className="p-3 mb-6 rounded-xl  w-full bg-gray-300 bg-opacity-60"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          className="p-3 font-semibold text-white bg-blue-400 rounded-lg  w-full hover:translate-y-1 hover:bg-blue-300"
          onClick={handleClick}
        >
          Sign In
        </button>
        <div className="mt-2">
          Don't have an Account?{" "}
          <Link
            className="text-blue-400 hover:text-blue-500 font-semibold"
            to="/register"
          >
            {" "}
            Sign Up
          </Link>
        </div>
      </div>
      <Toaster/>
    </div>
  );
}

export default Login;
