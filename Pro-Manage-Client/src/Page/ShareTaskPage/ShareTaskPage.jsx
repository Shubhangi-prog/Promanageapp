import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { PiCodesandboxLogoLight } from "react-icons/pi";
import style from './ShareTaskPage.module.css'
import { BiSolidCircle } from "react-icons/bi";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { GetSharedTask } from '../../apis/TaskApi';

const ShareTaskPage = () => {
const {id}=useParams();
const [data,setData]=useState();

useEffect(()=>{
    const getTask = async()=>{
      
        const response= await GetSharedTask(id);
  
        if(response){
          
            setData(response.response)
        }
    }

    getTask();
},[])

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

  
 
  const priorityColor =data?
  data.priority == "HIGH PRIORITY"
    ? "#FF2473"
    : data.priority == "LOW PRIORITY"
    ? "#63C05B"
    : data.priority == "MODERATE PRIORITY"
    ? "#18B0FF"
    : null:null;

  return (

    <>
        <div className={style.header}>
           <PiCodesandboxLogoLight/> <span>Pro Manage</span>
        </div>
        {data?<div className={style.body}>
            <div className={style.taskContainer} >
            <div className={style.taskHeader}>
                      <div className={style.KartPriority}>
                        <BiSolidCircle style={{ color: priorityColor }} />
                        <span>{data.priority}</span>
                      </div>
                    
                    </div>
                    <div className={style.KartTitle}>{data.title}</div>
                    <div className={style.checkListHeader}>
                      <span>checklist({data.checkList.filter((data)=>data.checked===true).length}/{data.checkList.map((data)=>data).length})</span>
                      
           
                    </div>
                  <div className={style.taskChecklist}>
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
                          <div className={style.checkboxtext} >
                            {items.value}
                          </div>
                        </div>
                        )

                      })
                    }
                  </div>
                   {data.dueDate?<div className={style.taskKartBottom}>
                      <div className={style.dueDatebtn} >
                        <div>Due Date </div> {data.dueDate?<span style={{backgroundColor:"#CF3636",color:"#FFFFFF"}} className={style.taskbtn}>{formatDate(data.dueDate)}</span>:null}
                      </div>
                   
                    </div>:null} 
                    
            </div>
        </div>:null}
    </>

  )
}

export default ShareTaskPage