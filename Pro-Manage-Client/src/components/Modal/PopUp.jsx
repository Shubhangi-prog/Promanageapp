import React from 'react'
import style from './PopUp.module.css'
import RegisterLoginButton from '../RegisterLoginButton/RegisterLoginButton'

const PopUp = ({text,yes,no}) => {
  
  return (
    <div className={style.Container}>
        <div className={style.PopUp}>
            <div className={style.heading}>Are you sure you want to {text}?</div>
            <div className={style.buttonContainer}>
            <RegisterLoginButton text={`Yes, ${text}`} bgcolor={"#17A2B8"} color={"#FFFFFF"} type={"submit"} click={yes}/>
            <RegisterLoginButton text={"Cancel"} bgcolor={"#FFFFFF"} bdcolor={"#CF3636"} color={"#CF3636"} type={"submit"} click={no}/>
            </div>
           
        </div>
    </div>
  )
}

export default PopUp