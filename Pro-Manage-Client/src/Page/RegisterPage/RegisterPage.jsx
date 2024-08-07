import React from 'react'
import CoverBanner from '../../components/CoverBanner/CoverBanner'
import style from './RegisterPage.module.css'
import RegisterForm from '../../components/registerForm/RegisterForm'

const RegisterPage = () => {
  return (
    <div className={style.body}>
     <CoverBanner/>
     <RegisterForm/>
    </div>
  )
}

export default RegisterPage