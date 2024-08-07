import React,{useState,useContext} from 'react'
import style from './SettingView.module.css'
import BoardFilterContext from '../../context/BoardFilter/BoardFilterContext';
import DashnavigateContext from '../../context/NavigateDashboard/DashnavigateContext';
import { UpdateUserDetails } from '../../apis/UserApi';
import { FaRegUser } from "react-icons/fa6";
import { MdLockOutline } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import RegisterLoginButton from '../RegisterLoginButton/RegisterLoginButton';
import { toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";

const SettingView = () => {

  const [showHideNewPassword, setshowHideNewPassword] = useState(true);
  const [showHideOldPassword, setshowHideOldPassword] = useState(true);
  const [oldPassword, setoldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const{userName,HandleChangeUserName,setUserName}=useContext(BoardFilterContext);
  const {Select}= useContext(DashnavigateContext);


  const handleSubmit=async(e)=>{
    e.preventDefault()
    
    if(userName&&!oldPassword&&!newPassword){
      const response = await UpdateUserDetails(userName);
      
      if(response){
        localStorage.setItem("name",response.name) 
        setUserName(localStorage.getItem("name"))
        toast.success(response.msg)
        
      }
    }else if(userName&&oldPassword&&newPassword){
      const response = await UpdateUserDetails(userName,oldPassword,newPassword); 
      if(response){
        localStorage.setItem("name",response.name) 
        setUserName(localStorage.getItem("name"))
        setnewPassword(null);
        setoldPassword(null);
        Select("Board")
        toast.success(response.msg)
      }
    }else if(!userName&&oldPassword&&newPassword){
      const response = await UpdateUserDetails(userName,oldPassword,newPassword); 
      setnewPassword(null);
      setoldPassword(null);
      Select("Board")
      toast.success(response.msg)
    }else{
      toast.error("Please fill all fields properly and try agian")
    }
  }

  return (
    <div className={style.Contianer} >
      <div className={style.Title}>Setting</div>
      <form action="" className={style.form} onSubmit={handleSubmit}>
        <div className={style.InputContainer}>
       
          <div className={style.Input}>
           {/* Name */}
           <div className={style.inputBox}>
              <label htmlFor="name">
                
                <div className={style.IconContainer}>
                  <FaRegUser className={style.Icon} />
                </div>
              </label>

              <input
                autoComplete="given-name"
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                value={userName}
                onChange={HandleChangeUserName}
              />
              
            </div>
            {/* Old password */}
            <div className={style.inputBox}>
              <label htmlFor=" Old-password">
                
                <div className={style.IconContainer}>
                  <MdLockOutline className={style.Icon} />
                </div>
              </label>

              <input
                
              
                type={showHideOldPassword ? "password" : "text"}
                value={oldPassword}
                name=" Old-password"
                id=" Old-password"
                placeholder="Old Password"
                onChange={(e)=>setoldPassword(e.target.value)}
              />
              <div className={style.IconRight} onClick={()=>{
                setshowHideOldPassword(!showHideOldPassword)
              }} >
                      {showHideOldPassword?<RiEyeLine className={style.Icon}/>:<RiEyeCloseLine className={style.Icon}/>}
              </div>
           
            </div>
            {/* New Password */}
            <div className={style.inputBox}>
              <label htmlFor="NewPassword">
                
                <div className={style.IconContainer}>
                  <MdLockOutline className={style.Icon} />
                </div>
              </label>

              <input
                
           
                type={showHideNewPassword ? "password" : "text"}
                value={newPassword}
                name="NewPassword"
                id="NewPassword"
                placeholder="New Password"
                onChange={(e)=>setnewPassword(e.target.value)}
              />
              <div className={style.IconRight} onClick={()=>{
                setshowHideNewPassword(!showHideNewPassword)
              }} >
                  {showHideNewPassword?<RiEyeLine className={style.Icon}/>:<RiEyeCloseLine className={style.Icon}/>}
              </div>
             
            </div>
          </div>
        </div>
        <div className={style.buttonContainer}>
        <RegisterLoginButton
          type={"submit"}
          text={"Update"}
          bgcolor={"#17A2B8"}
          color={"#FFFFFF"}
        />
      
        </div>
      </form>
    </div>
  )
}

export default SettingView