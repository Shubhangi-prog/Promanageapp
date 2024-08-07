import React from 'react'
import style from '../RegisterPage/RegisterPage.module.css'
import CoverBanner from '../../components/CoverBanner/CoverBanner'
import LogilnForm from '../../components/LoginForm/LogilnForm'


const LoginPage = () => {
  return (
    <div className={style.body}>
     <CoverBanner/>
     <LogilnForm/>
    </div>
  )
}

export default LoginPage