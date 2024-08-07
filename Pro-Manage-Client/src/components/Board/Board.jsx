import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./Board.module.css";
import BoardFilterContext from "../../context/BoardFilter/BoardFilterContext";
import CreateTaskContext from "../../context/CreateTask/CreateTaskContext";
import { MdKeyboardArrowDown } from "react-icons/md";
import { VscCollapseAll } from "react-icons/vsc";
import { IoAddOutline } from "react-icons/io5";
import TaskKarts from "../taskKarts/TaskKarts";


const board = () => {
  const {
    FilterSelected,
    selectFilter,
    filterPopUp,
    popUp,
    userName,
    setUserName,
  } = useContext(BoardFilterContext);
  const { handleAddCreateToggle,backlogtask,todo,progress,done,} = useContext(CreateTaskContext);
  const [backlogcollapseall, setbacklogcollapseall] = useState(false);
  const [todocollaspseall, settodocollaspseall] = useState(false);
  const [progresscollapseall, setprogresscollapseall] = useState(false);
  const [donecollapseall, setdonecollapseall] = useState(false);
  const popUpRef = useRef();

  function formatDate(date) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const nth = (d) => {
      if (d > 3 && d < 21) return "th";
      switch (d % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };
    const postfix = nth(date.getDate());
    const dateString = `${date.getDate()}${postfix} ${month}, ${year}`;
    return dateString;
  }

  function formatDate2(dateString) {
 
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

 

  useEffect(() => {
    setUserName(localStorage.getItem("name"));
  },[]);

  useEffect(() => {
    const ClosePopup = (e) => {
      if (popUpRef.current && !popUpRef.current.contains(e.target)) {
        popUp();
      }
    };
    addEventListener("mousedown", ClosePopup);
    return () => {
      removeEventListener("mousedown", ClosePopup);
    };
  });



  return (
    <div className={`${style.BoardContainer} dashBoardGloble`}>
      <div className={style.header}>
        <h1>Welcome! {userName}</h1>
        <span className={style.dateMonth}>{formatDate(new Date(Date()))}</span>
      </div>
      <div className={style.BoardBody}>
        <div className={style.BoardBodyHeader}>
          <h1>Board</h1>
          <div className={style.filter} onClick={popUp}>
            {FilterSelected}
            <MdKeyboardArrowDown className={style.dropDownlogo} />
          </div>
          {filterPopUp ? (
            <div className={style.FilterPopUp} ref={popUpRef}>
              <div
                className={style.FilterPopUpItems}
                onClick={() => selectFilter("Today")}
                >
                <span>Today</span>
              </div>
              <div
                className={style.FilterPopUpItems}
                onClick={() => selectFilter("This week")}
               >
                <span>This Week</span>
              </div>
              <div
                className={style.FilterPopUpItems}
                onClick={() => selectFilter("This Month")}
                >
                <span>This Month</span>
              </div>
            </div>
          ) : null}
        </div>
        <div className={style.KanBanContainer}>
          <div className={style.KanBanBoard}>
            <div className={style.KanBanBoardHead}>
              <span>Backlog</span>
              <VscCollapseAll onClick={()=>setbacklogcollapseall(!backlogcollapseall)} className={style.ColapseLogo} />
            </div>
            <div className={style.KanbanBoardBody}>

                {/* Backlog map */}


              {backlogtask.map((data,i) => {
                const priorityColor =
                  data.priority == "HIGH PRIORITY"
                    ? "#FF2473"
                    : data.priority == "LOW PRIORITY"
                    ? "#63C05B"
                    : data.priority == "MODERATE PRIORITY"
                    ? "#18B0FF"
                    : null;

                  

                return (
                    <TaskKarts collaspseAll={backlogcollapseall} key={i} priorityColor={priorityColor} data={data} i={i} />
                );
              })}
            </div>
          </div>
          <div className={style.KanBanBoard}>
            <div className={style.KanBanBoardHead}>
              <span>Todo</span>
              <div>
                <IoAddOutline
                  onClick={handleAddCreateToggle}
                  className={style.ColapseLogo}
                  style={{ marginRight: "1rem", color: "#000000" }}
                />
                <VscCollapseAll onClick={()=>settodocollaspseall(!todocollaspseall)} className={style.ColapseLogo} />
              </div>
            </div>
            <div className={style.KanbanBoardBody}>
              {/* todo map here */}
              {todo.map((data,i) => {
                const priorityColor =
                  data.priority == "HIGH PRIORITY"
                    ? "#FF2473"
                    : data.priority == "LOW PRIORITY"
                    ? "#63C05B"
                    : data.priority == "MODERATE PRIORITY"
                    ? "#18B0FF"
                    : null;

                return (
                  <TaskKarts collaspseAll={todocollaspseall} key={i} priorityColor={priorityColor} data={data} i={i} />
                 
                );
              })}
            </div>
          </div>
          <div className={style.KanBanBoard}>
            <div className={style.KanBanBoardHead}>
              <span>In progress</span>
              <VscCollapseAll onClick={()=>setprogresscollapseall(!progresscollapseall)} className={style.ColapseLogo} />
            </div>
            <div className={style.KanbanBoardBody}>
            {progress.map((data,i) => {
                const priorityColor =
                  data.priority == "HIGH PRIORITY"
                    ? "#FF2473"
                    : data.priority == "LOW PRIORITY"
                    ? "#63C05B"
                    : data.priority == "MODERATE PRIORITY"
                    ? "#18B0FF"
                    : null;

                return (
                  <TaskKarts collaspseAll={progresscollapseall} key={i} priorityColor={priorityColor} data={data} i={i} />
                );
              })}
            </div>
          </div>
          <div className={style.KanBanBoard}>
            <div className={style.KanBanBoardHead}>
              <span>Done</span>
              <VscCollapseAll onClick={()=>setdonecollapseall(!donecollapseall)} className={style.ColapseLogo} />
            </div>
            <div className={style.KanbanBoardBody}>
            {done.map((data,i) => {
                const priorityColor =
                  data.priority == "HIGH PRIORITY"
                    ? "#FF2473"
                    : data.priority == "LOW PRIORITY"
                    ? "#63C05B"
                    : data.priority == "MODERATE PRIORITY"
                    ? "#18B0FF"
                    : null;

                return (
                  <TaskKarts collaspseAll={donecollapseall} key={i} priorityColor={priorityColor} data={data} i={i} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default board;
