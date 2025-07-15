import { LinearGradient } from "react-text-gradients";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { CiSun } from "react-icons/ci";
import { AiOutlineMoon } from "react-icons/ai";
import { useColorMode } from "../components/ui/color-mode.jsx";
import BasicMenu from "./Menu.jsx";
import CartDrawer from "./CartDrawer.jsx";
import { authContext } from "../context/AuthProvider.jsx";

export default function NavBar() {

 const role = localStorage.getItem("role");

 const{authenticated} = useContext(authContext);

  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 20,
      }}
    >
      <div style={{ fontSize: 50, fontFamily: "cursive", font: "bold" ,display : "flex", gap : "6px"}}>
        <div>
        <BasicMenu />
      </div>
      {role!=="admin" && 
      <Link to="/">
          <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
             Store 🛒
          </LinearGradient>
        </Link>
      }
       {role==="admin" && <Link to="/admin">
          <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
             Store 🛒
          </LinearGradient>
        </Link> }
      </div>
      <div
        style={{ fontSize: 28, display: "flex", alignItems: "center", gap: 10 }}
      >
        {role==="admin" && <Link to="/create">
          <CiSquarePlus />
        </Link>}
         {authenticated && <CartDrawer/>}
        
        

        <div onClick={toggleColorMode}>
          {colorMode === "light" ? <AiOutlineMoon /> : <CiSun />}
        </div>
      </div>
    </div>
  );
}
