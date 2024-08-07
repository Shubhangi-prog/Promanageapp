import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginSchema } from "../../schemas/LoginVal"; 
import style from "../registerForm/RegisterForm.module.css";//took the styles from registerFrom css
import { GoMail } from "react-icons/go";
import { MdLockOutline } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import RegisterLoginButton from "../RegisterLoginButton/RegisterLoginButton";
import { loginUser } from "../../apis/UserApi";
import { useContext } from "react";
import DashnavigateContext from "../../context/NavigateDashboard/DashnavigateContext";
import CreateTaskContext from "../../context/CreateTask/CreateTaskContext";

const LogilnForm = () => {
  const [showHidePassword, setshowHidePassword] = useState(true);
  const{Select}=useContext(DashnavigateContext)
  const{fetchData}= useContext(CreateTaskContext)
    
  const nav = useNavigate();


  
  const onSubmit = async(values, actions) => {
    const {email,password}=values;
    const response = await loginUser(email,password);
    if(response){
      localStorage.setItem("token",response.token)
      localStorage.setItem("name",response.name) 
      Select("Board");
      fetchData();
      nav('/');
    }
   
  };

  const navRegister=()=>{
    nav('/register')
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit,
    });

  return (
    <div className={style.body}>
      <form action="" className={style.form} onSubmit={handleSubmit}>
        <div className={style.InputContainer}>
          <h1>Login</h1>
          <div className={style.Input}>
            
            <div className={style.inputBox}>
              <label htmlFor="email">
                
                <div className={style.IconContainer}>
                  <GoMail className={style.Icon} />
                </div>
              </label>

              <input
                value={values.email}
                onBlur={handleBlur}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={handleChange}
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
                onBlur={handleBlur}
                type={showHidePassword ? "password" : "text"}
                name="password"
                id="password"
                placeholder="Password"
                onChange={handleChange}
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
           
          </div>
        </div>
        <div className={style.buttonContainer}>
        <RegisterLoginButton
          type={"submit"}
          text={"Login"}
          bgcolor={"#17A2B8"}
          color={"#FFFFFF"}
        />
        <span className={style.footerQuestionStyle} >Have no account yet?</span>
        <RegisterLoginButton
          click={navRegister}
          type={"reset"}
          text={"Register"}
          bgcolor={"#FFFFFF"}
          color={"#17A2B8"}
          bdcolor={"#17A2B8"}
        />
        </div>
      </form>
    </div>
  )
}

export default LogilnForm