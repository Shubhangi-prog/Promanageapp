import React, { useContext, useEffect, useState } from "react";
import CreateTaskContext from "./CreateTaskContext";
import { GoDotFill } from "react-icons/go";
import { CreateTask } from "../../apis/TaskApi";
import { GetAllTask } from "../../apis/TaskApi";
import DashnavigateContext from "../NavigateDashboard/DashnavigateContext";
import BoardFilterContext from "../BoardFilter/BoardFilterContext";

const CreateTaskState = (props) => {
  const [toggleCreateTask, setToggleCreateTask] = useState(false);
  const [title, setTitle] = useState("");
  const [priorityType, setPriorityType] = useState("");
  const [checkList, setCheckList] = useState([]);
  const [countCheckList, setcountCheckList] = useState(0);
  const [date, setDate] = useState(""); 
  const [disbaleButton, setDisableButton] = useState(true);
  const [taskType] = useState("todo");
  const [newtask, setnewTask] = useState(0);
  
  const {backlogtask, setbacklogtask,todo, setTodo,progress, setprogress,done, setdone}= useContext(DashnavigateContext)
  const {FilterSelected}=useContext(BoardFilterContext)

  useEffect(() => {
    validateButton();
  }, [title, priorityType, countCheckList]);

  // Get All task created by user

  const fetchData = async () => {
    try {
      const response = await GetAllTask(FilterSelected);
      
      if(response){
        setbacklogtask(response.response.filter((data) => {
          return data.taskType === "backlog";
        }));
       setTodo(response.response.filter((data) => {
        return data.taskType === "todo";
      }))
       setprogress(response.response.filter((data) => {
        return data.taskType === "in-progress";
      }))
       setdone(response.response.filter((data) => {
        return data.taskType === "done";
      }))
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(()=>{

    if(localStorage.getItem("token")){
      fetchData();
    }
    
  },[newtask,FilterSelected])
  

  const validateButton = () => {
    const temp = checkList.filter(({ value }) => {
      return value == "";
    }).length;

    if (title && priorityType && countCheckList && !temp) {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

// This function will create the data
  const Savedata = async () => {
    const color = "#DBDBDB";
    const temp = date.split("/");
    const dueDate = temp.join("-");
    const response = await CreateTask(
      title,
      priorityType,
      checkList,
      dueDate,
      taskType,
      color
    );
    if (response) {
      setToggleCreateTask(false);
      setTitle("");
      setPriorityType("");
      setCheckList([]);
      setcountCheckList(0);
      setDate("");
      setDisableButton(true);
      setnewTask("created task");
    }
  };


  const handleAddCreateToggle = () => {
    setToggleCreateTask(!toggleCreateTask);
      setTitle("");
      setPriorityType("");
      setCheckList([]);
      setcountCheckList(0);
      setDate("");
      setDisableButton(true);
      setnewTask(newtask+1);
  };

 

  const ConvertDate = (e) => {
    let selectedDate = e.target.value;
    let temp = selectedDate.split("-");
    temp.reverse();
    selectedDate = temp.join("/");
    setDate(selectedDate);
  };
  const HandleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const HandleChecklistValue = (e, i) => {
    const temp = checkList;
    temp[i].value = e.target.value;
    setCheckList([...temp]);
    validateButton();
  };
  const AddCheckList = () => {
    setcountCheckList(countCheckList + 1);
    setCheckList([...checkList, { value: "", checked: false, countCheckList }]);
  };
  const RemoveCheckList = (i) => {
    const temp = checkList;
    temp.splice(i, 1);
    setCheckList([...temp]);
    setcountCheckList(countCheckList - 1);
  };

  const ToggleChecked = (i) => {
    const temp = checkList;
    temp[i].checked = !checkList[i].checked;
    setCheckList([...temp]);
  };

  const PriorityButton = ({ text, color }) => {
    const handleClick = (text) => {
      setPriorityType(text);
    };

    return (
      <div
        onClick={() => handleClick(text)}
        style={{
          padding: "0.5rem 1rem",
          fontFamily: "var(--font-poppins)",
          border: "1px solid #E2E2E2",
          borderRadius: "5px",
          width: "max-content",
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          backgroundColor: `${priorityType === text ? "#EEECEC" : "#FFFFFF"}`,
        }}>
        <GoDotFill
          style={{
            color: `${color}`,
            marginRight: "0.5rem",
            fontSize: "1.2rem",
          }}
        />
        <span style={{ fontSize: "1.2rem", color: "#767575" }}>
          {text.toUpperCase()}
        </span>
      </div>
    );
  };

  return (
    <CreateTaskContext.Provider
      value={{
        toggleCreateTask,
        handleAddCreateToggle,
        title,
        PriorityButton,
        HandleTitleChange,
        AddCheckList,
        countCheckList,
        checkList,
        RemoveCheckList,
        ToggleChecked,
        HandleChecklistValue,
        ConvertDate,
        date,
        Savedata,
        disbaleButton,
        newtask,
        backlogtask,
        todo,
        progress,
        done,
        setnewTask,
        setbacklogtask,
        setTodo,
        setprogress,
        setdone,
        fetchData,
      }}>
      {props.children}
    </CreateTaskContext.Provider>
  );
};

export default CreateTaskState;
