import { LinearGradient } from 'react-text-gradients'
import React from 'react'
import { useTheme } from 'next-themes'
import { Link } from 'react-router-dom';
import { CiSquarePlus } from "react-icons/ci";
import { CiSun } from "react-icons/ci";
import { AiOutlineMoon } from "react-icons/ai";

export function useColorMode() {
  const { resolvedTheme, setTheme, forcedTheme } = useTheme()
  const colorMode = forcedTheme || resolvedTheme
  const toggleColorMode = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }
  return {
    colorMode: colorMode,
    setColorMode: setTheme,
    toggleColorMode,
  }
}

export default function NavBar() {
  const {colorMode,toggleColorMode} = useColorMode();
  return (
    <div style={{display: 'flex', alignItems : 'center' , justifyContent : 'space-between', padding : 20}}>
        <div style={{fontSize : 50 ,fontFamily : 'cursive', font : 'bold'}}>
          <Link to='/'>
          <LinearGradient gradient={['to left', '#17acff ,#ff68f0']}>
           Product Store  🛒            
          </LinearGradient>

          </Link>
        </div>
        <div style={{fontSize : 30,display: 'flex', alignItems : 'center', gap : 20}}>
         <Link to='/create'>
           <CiSquarePlus />
         </Link>
         <div onClick={toggleColorMode}>
            {colorMode === 'light' ? <AiOutlineMoon/> : <CiSun/>}
         </div>
        </div>
    </div>
  )
}




