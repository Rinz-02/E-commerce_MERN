import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Toaster, toaster } from "../components/ui/toaster";

function Register() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/auth/register", {
        user: user,
        password: password,
      });

      if (res.data.success === true) {
        navigate("/login");
      } else {
        toaster.create({
          titile: "Error",
          type: "error",
          description: res.data.message,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="flex flex-col container mx-auto  items-center">
      <div
        className={`flex flex-col container mx-auto w-2/3 md:w-1/2  p-4 rounded-xl mt-28 bg-gray-300 shadow-lg items-center bg-opacity-55`}
      >
        {/* <div className='bg-gray-300 w-full p-2 flex items-center flex-col rounded-lg '> */}
        <div className="w-full">
          <p className="mb-3">User Name</p>
          <input
            placeholder="Enter User Name"
            className="p-3 mb-4 rounded-xl w-full bg-gray-300 bg-opacity-60"
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
          className="p-3  bg-blue-400 rounded-lg  w-full hover:translate-y-1 hover:bg-blue-300 font-semibold text-white"
          onClick={handleClick}
        >
          Sign Up
        </button>
        <div className="mt-2">
          Already have an Account?{" "}
          <Link
            className="text-blue-400 hover:text-blue-700 font-semibold"
            to="/login"
          >
            {" "}
            Sign In
          </Link>
        </div>
      </div>
      {/* </div> */}
      <Toaster />
    </div>
  );
}

export default Register;
