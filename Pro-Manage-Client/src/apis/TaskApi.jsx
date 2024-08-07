import axios from "axios";
const backendUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/task`;
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateTask = async (title,priority,checkList,dueDate,taskType,color) => {
   
  try {
    const reqUrl = `${backendUrl}/createTask`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const reqPayLoad = { title,priority,checkList,dueDate,taskType,color };
    const response = await axios.post(reqUrl, reqPayLoad);
    toast.success(response.data.msg);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const GetAllTask=async(duration)=>{
  try {
   
    const reqUrl = `${backendUrl}/GetAllTask`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

    const response = await axios.post(reqUrl, {duration:duration});
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const AllAnalytics = async () => {
  try {
    const reqUrl = `${backendUrl}/task-analytics`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const EditTask=async(title,priority,checkList,dueDate,taskType,id)=>{
  try {
    const reqUrl = `${backendUrl}/editTask/${id}`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const reqPayLoad = { title,priority,checkList,dueDate,taskType,id};
    const response = await axios.put(reqUrl, reqPayLoad);
    toast.success(response.data.message);
    return response.data;
   
  } catch (error) {
    console.log(error)
  }
}

export const ChangeTaskType=async(taskType,id)=>{
  try {
   
    const reqUrl = `${backendUrl}/changeType/${id}`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const reqPayLoad = {taskType};
    const response = await axios.patch(reqUrl, reqPayLoad);
    toast.success(response.message);
    return response.data;
  } catch (error) {
    console.log(error)
  }
}

export const DeleteTask=async(id)=>{
  try {
    const reqUrl = `${backendUrl}/deleteTask/${id}`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const response = await axios.delete(reqUrl);
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}

export const GetSharedTask=async(id)=>{
  try {

    const reqUrl = `${backendUrl}/sharedTask/${id}`;
    let AUTH_TOKEN = localStorage.getItem("token");
    axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
    const response = await axios.get(reqUrl);

    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
}