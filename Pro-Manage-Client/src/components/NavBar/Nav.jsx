import React, { useContext, useState } from 'react'
import style from './Nav.module.css'
import { PiCodesandboxLogoLight } from "react-icons/pi";
import { BsReverseLayoutTextWindowReverse } from "react-icons/bs";
import { GoDatabase } from "react-icons/go";
import { FiSettings } from "react-icons/fi";
import { IoLogOutOutline } from "react-icons/io5";
import DashnavigateContext from '../../context/NavigateDashboard/DashnavigateContext';

const Nav = () => {
     const {isSelected,Select,ConfirmLogout}=useContext(DashnavigateContext);
     
     
  return (
    <div className={style.NavBody} >
        <div className={style.Title}>
            <PiCodesandboxLogoLight className={style.SandBoxLogo} />
            <h1>Pro Manage</h1>
        </div>
        <div className={style.Menu} >
            <div className={style.menuItems} style={
                {
                    color:isSelected==="Board"?"#000000":"#707070",
                    backgroundColor:isSelected==="Board"?"#4391ed1a":"#FFFFFF"
                                        
                }
                } onClick={()=>Select("Board")} ><BsReverseLayoutTextWindowReverse className={style.MenuLogo} /><h2>Board</h2></div>
            <div className={style.menuItems} style={
                {
                    color:isSelected==="Analytics"?"#000000":"#707070",
                    backgroundColor:isSelected==="Analytics"?"#4391ed1a":"#FFFFFF"
                                        
                }
                } onClick={()=>Select("Analytics")} ><GoDatabase className={style.MenuLogo} /><h2>Analytics</h2></div>
            <div className={style.menuItems} style={
                {
                    color:isSelected==="Settings"?"#000000":"#707070",
                    backgroundColor:isSelected==="Settings"?"#4391ed1a":"#FFFFFF"
                                        
                }
                } onClick={()=>Select("Settings")} > <FiSettings className={style.MenuLogo} /> <h2>Settings</h2></div>
        </div>
        <div className={style.LogoutContainer} onClick={ConfirmLogout}>
            <IoLogOutOutline className={style.LogoutLogo} /> <h2>Logout</h2>
        </div>
    </div>
  )
}

export default Nav