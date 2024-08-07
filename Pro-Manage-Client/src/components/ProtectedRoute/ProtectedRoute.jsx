import React, { useEffect, useState } from 'react'
import {IsLoggedIn} from '../../apis/UserApi'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = (props) => {
  const [IsLogged,setIsLoggedIn]=useState(false)
  const nav = useNavigate();
  const {Components}=props;
  useEffect(()=>{
    // IsUser();
    const token = localStorage.getItem("token")
    if(token){
      setIsLoggedIn(true);
    }else{
      setIsLoggedIn(false);
      nav('/login')
    }
  })
  
 
  // const IsUser = async()=>{
   
  //   const response = await IsLoggedIn();
  //   debugger
  //   if(response){
  //     if(response.IsUser){
  //       setIsLoggedIn(true)
  //     }
      
  //   }else{
  //     setIsLoggedIn(false)
  //   }

  // }

  return(
    <div>{IsLogged?<Components/>:null}</div>
  );

   
  
}

export default ProtectedRoute