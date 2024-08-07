import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { basicSchema } from "../../schemas/index";
import style from "./RegisterForm.module.css";
import { FaRegUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { GoMail } from "react-icons/go";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import RegisterLoginButton from "../RegisterLoginButton/RegisterLoginButton";
import { registerUser } from "../../apis/UserApi";
import DashnavigateContext from "../../context/NavigateDashboard/DashnavigateContext";




const RegisterForm = () => {
  const [showHidePassword, setshowHidePassword] = useState(true);
  const [showHideConfirmPassword, setshowHideConfirmPassword] = useState(true);
  const{Select}=useContext(DashnavigateContext)

  const nav = useNavigate();
  const onSubmit = async (values, actions) => {
    const {name,email,password}=values;
    const response = await registerUser(name,email,password);
    if(response){
      localStorage.setItem("token",response.token) 
      localStorage.setItem("name",response.name) 
      Select("Board")
      nav('/')
    }
   
  };

  const navLogin=()=>{
    nav('/login')
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: basicSchema,
      onSubmit,
    });

  // const handleChange=(e)=>{
  //     setData({...data,[e.target.name]:e.target.value})
  // }

  return (
    <div className={style.body}>
     
      <form action="" className={style.form} onSubmit={handleSubmit}>
        <div className={style.InputContainer}>
       
          <div className={style.Input}>
            <div className={style.inputBox}>
              <label htmlFor="name">
                
                <div className={style.IconContainer}>
                  <FaRegUser className={style.Icon} />
                </div>
              </label>

              <input
            value={values.name}
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name ? (
                <span className={style.ErrorMsg}>{errors.name}</span>
              ) : null}
            </div>
            <div className={style.inputBox}>
              <label htmlFor="email">
                
                <div className={style.IconContainer}>
                  <GoMail className={style.Icon} />
                </div>
              </label>

              <input
               value={values.email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email ? (
                <span className={style.ErrorMsg}>{errors.email}</span>
              ) : null}
            </div>
            <div className={style.inputBox}>
              <label htmlFor="password">
                
                <div className={style.IconContainer}>
                  <MdLockOutline className={style.Icon} />
                </div>
              </label>

              <input
                    value={values.password}
                type={showHidePassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={style.IconRight} onClick={()=>{
                setshowHidePassword(!showHidePassword)
              }} >
                      {showHidePassword?<RiEyeLine className={style.Icon}/>:<RiEyeCloseLine className={style.Icon}/>}
              </div>
              {errors.password && touched.password ? (
                <span className={style.ErrorMsg}>{errors.password}</span>
              ) : null}
            </div>
            <div className={style.inputBox}>
              <label htmlFor="confirmPassword">
                
                <div className={style.IconContainer}>
                  <MdLockOutline className={style.Icon} />
                </div>
              </label>

              <input
                
                value={values.confirmPassword}
                type={showHideConfirmPassword ? "password" : "text"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div className={style.IconRight} onClick={()=>{
                setshowHideConfirmPassword(!showHideConfirmPassword)
              }} >
                  {showHideConfirmPassword?<RiEyeLine className={style.Icon}/>:<RiEyeCloseLine className={style.Icon}/>}
              </div>
              {errors.confirmPassword && touched.confirmPassword ? (
                <span className={style.ErrorMsg}>{errors.confirmPassword}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className={style.buttonContainer}>
        <RegisterLoginButton
          type={"submit"}
          text={"Register"}
          bgcolor={"#17A2B8"}
          color={"#FFFFFF"}
        />
        <span className={style.footerQuestionStyle} >Have an account ?</span>
        <RegisterLoginButton
          click={navLogin}
          type={"reset"}
          text={"Login"}
          bgcolor={"#FFFFFF"}
          color={"#17A2B8"}
          bdcolor={"#17A2B8"}
        />
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
