import axios from "axios";
import { useNavigate } from "react-router-dom";
const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth`;
import {  toast } from "react-toastify";
import  "react-toastify/dist/ReactToastify.css";


export const registerUser = async (name, email, password) => {
  try {
    const reqUrl = `${backendUrl}/register`;
    const reqPayLoad = { name, email, password };
    const response = await axios.post(reqUrl, reqPayLoad);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const loginUser = async (email, password) => {
  try {
    const reqUrl = `${backendUrl}/loginUser`;
    const reqPayLoad = { email, password };
    const response = await axios.post(reqUrl, reqPayLoad);
    toast.success(response.data.message);
    return response.data;
  } catch (error) {
    // console.log(error)
    toast.error(error.response.data.errorMessage);
  }
};

export const IsLoggedIn = async () => {
  try {
    const reqUrl = `${backendUrl}/IsUser`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const response = await axios.post(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error)
  }
};

export const UpdateUserDetails =async(name,oldPassword,newPassword)=>{
  try {
    const reqUrl = `${backendUrl}/UpdateUserDetails`;
    let AUTH_TOKEN = localStorage.getItem("token");
    const reqPayLoad = { name,oldPassword,newPassword };
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const response = await axios.put(reqUrl,reqPayLoad);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.errorMessage)
  }

}