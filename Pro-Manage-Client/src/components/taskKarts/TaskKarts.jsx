import React, { useContext, useEffect, useRef } from 'react'
import style from './TaskKart.module.css'
import { BiSolidCircle } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { CiSquareChevDown } from "react-icons/ci";
import { CiSquareChevUp } from "react-icons/ci";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { useState } from 'react';
import EditTaskContext from '../../context/EditTask/EditTaskContext';
import DeleteTaskContext from '../../context/DeleteTask/DeleteTaskContext';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




const TaskKarts = ({ priorityColor,data,i,collaspseAll}) => {

  const [expand, setExpand] = useState(false);
  const [showdropdown, setshowdropdown] = useState(false);
  const {handleEditToggle,changeType}=useContext(EditTaskContext)
  
  const {setdeletePopUP,setId}=useContext(DeleteTaskContext)

  
  const popUp=()=>{
    setshowdropdown(!showdropdown)
      }

  const ThreeDotPopup=useRef();
  


  useEffect(() => {
    const ClosePopup = (e) => {
      if (ThreeDotPopup.current && !ThreeDotPopup.current.contains(e.target)) {
        popUp();
      }
    };
    addEventListener("mousedown", ClosePopup);
    return () => {
      removeEventListener("mousedown", ClosePopup);
    };
  });

  useEffect(()=>{
 
    setExpand(false)
 
  },[collaspseAll])


  
  function formatDate(dateString) {
 
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  
    const parts = dateString.split('-');
    const month = months[parseInt(parts[1], 10) - 1];
    const day = parseInt(parts[1], 10);
    

    // Adding suffix to day (e.g., '1st', '2nd', '3rd', '4th', etc.)
    let suffix;
    if (day === 1 || day === 21 || day === 31) {
      suffix = 'st';
    } else if (day === 2 || day === 22) {
      suffix = 'nd';
    } else if (day === 3 || day === 23) {
      suffix = 'rd';
    } else {
      suffix = 'th';
    }
  
    return `${month} ${day}${suffix}`;
  }


 const TypeChip=()=>{

   if(data.taskType==="backlog"){
      return (
        <div className={style.taskTypebtn}>
        <span className={style.taskbtn} onClick={()=>changeType("todo",data._id)} >TODO</span>
        <span className={style.taskbtn} onClick={()=>changeType("in-progress",data._id)} >PROGRESS</span>
        <span className={style.taskbtn} onClick={()=>changeType("done",data._id)} >DONE</span>
        </div>
      )
   }else if(data.taskType==="todo"){
    return (
      <div className={style.taskTypebtn}>
      <span className={style.taskbtn} onClick={()=>changeType("backlog",data._id)} >BACKLOG</span>
      <span className={style.taskbtn} onClick={()=>changeType("in-progress",data._id)} >PROGRESS</span>
      <span className={style.taskbtn} onClick={()=>changeType("done",data._id)} >DONE</span>
      </div>
      )
   }else if(data.taskType==="in-progress"){
    return (
      <div className={style.taskTypebtn}>
      <span className={style.taskbtn} onClick={()=>changeType("backlog",data._id)} >BACKLOG</span>
      <span className={style.taskbtn} onClick={()=>changeType("todo",data._id)} >TODO</span>
      <span className={style.taskbtn} onClick={()=>changeType("done",data._id)} >DONE</span>
      </div>
      )
   }else if(data.taskType==="done"){
    return (
      <div className={style.taskTypebtn}>
      <span className={style.taskbtn} onClick={()=>changeType("backlog",data._id)} >BACKLOG</span>
      <span className={style.taskbtn} onClick={()=>changeType("todo",data._id)} >TODO</span>
      <span className={style.taskbtn} onClick={()=>changeType("in-progress",data._id)} >PROGRESS</span>
      </div>
      )
   }

 }
 const onCopyText=()=>{
   toast.success("Share link copied successfully")
   setshowdropdown(false)
 }


  return (
    <div key={i} className={style.taskKarts}>
                    <div className={style.taskHeader}>
                      <div className={style.KartPriority}>
                        <BiSolidCircle style={{ color: priorityColor }} />
                        <span>{data.priority}</span>
                      </div>
                      {/* OnClick edit,share and delete */}
                      <BsThreeDots
                        size={"2rem"}
                        style={{ cursor: "pointer" }}
                       onClick={()=>setshowdropdown(!showdropdown)}
                      />
                      {showdropdown?<div ref={ThreeDotPopup} className={style.EditShareDelPopUp} >
                              <div
                                className={style.EditShareDelPopUpItems}
                                // title,type,priorityType,checkList,dueDate,count
                                onClick={() => handleEditToggle(data.title,data.taskType,data.priority,data.checkList,data.dueDate,data.checkList.length,data._id)}>
                                <span>Edit</span>
                              </div>
                              <div
                                className={style.EditShareDelPopUpItems}
                               >
                                  <CopyToClipboard text={`${window.location.href}share/task/${data._id}`} onCopy={onCopyText}>
                                <span>Share</span>
                                </CopyToClipboard>
                              </div>
                              <div
                                className={style.EditShareDelPopUpItems}
                                onClick={() => {
                                  setId(data._id)
                                  setdeletePopUP(true)}}>
                                <span style={{color:"#CF3636"}} >Delete</span>
                              </div>
                      </div>:null}
                    </div>
                    <div className={style.KartTitle}>{data.title}</div>
                    <div className={style.checkListHeader}>
                      <span>checklist({data.checkList.filter((data)=>data.checked===true).length}/{data.checkList.map((data)=>data).length})</span>
                      {expand?<CiSquareChevUp
                        style={{
                          height: "2rem",
                          width: "2rem",
                          cursor: "pointer",
                        }}
                        onClick={()=>setExpand(false)}
                      />:<CiSquareChevDown
                      style={{
                        height: "2rem",
                        width: "2rem",
                        cursor: "pointer",
                      }}
                      onClick={()=>setExpand(true)}
                      />}
           
                    </div>

                  {expand?<div className={style.taskChecklist}>
                    {/* map here agian */}
                    {
                      data.checkList.map((items,index)=>{

                        return(
                          <div key={index} className={style.CheckListInputBox}>
                          <div>
                            {items.checked ? (
                              <MdCheckBox
                                // onClick={() => ToggleChecked(i)}
                                className={style.checkBox}
                                style={{ color: "#17A2B8", left: "1rem" }}
                              />
                            ) : (
                              <MdCheckBoxOutlineBlank
                                // onClick={() => ToggleChecked(i)}
                                className={style.checkBox}
                                style={{ color: "#E2E2E2", left: "1rem" }}
                              />
                            )}
                          </div>
                          <div>
                            {items.value}
                          </div>
                        </div>
                        )

                      })
                    }
                  </div>:null}
                    <div className={style.taskKartBottom}>
                      <div className={style.dueDatebtn} >
                        {data.dueDate?<span style={{backgroundColor:data.taskType==="done"?"#63C05B":data.color,color:data.color==="#CF3636"?"#FFFFFF":"#5A5A5A"}} className={style.taskbtn}>{formatDate(data.dueDate)}</span>:null}
                      </div>
                 
                        <TypeChip/>
                   
                    </div>
                    
                  </div>
  )
}

export default TaskKarts