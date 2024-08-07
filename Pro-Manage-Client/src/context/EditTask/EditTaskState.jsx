import React, { useContext, useState,useEffect } from "react";
import EditTaskContext from "./EditTaskContext";
import CreateTaskContext from "../CreateTask/CreateTaskContext";
import { GoDotFill } from "react-icons/go";
import { EditTask,ChangeTaskType } from "../../apis/TaskApi";



const EditTaskState = (props) => {
  const [toggleEditTask, settoggleEditTask] = useState(false);
  const [title, setTitle] = useState("");
  const [priorityType, setPriorityType] = useState("");
  const [checkList, setCheckList] = useState([]);
  const [countCheckList, setcountCheckList] = useState(0);
  const [date, setDate] = useState("");
  const [disbaleButton, setDisableButton] = useState(true);
  const [taskType, setTaskType] = useState("");
  const [id,setId]=useState();
  const{setnewTask,newtask}=useContext(CreateTaskContext)


    useEffect(() => {
        validateButton();
      }, [title, priorityType, countCheckList]);

//   title,priority,checkList,dueDate,taskType,id
  const Savedata = async () => {
    
    const temp = date.split("/");
    const dueDate = temp.join("-");
    const response = await EditTask(
      title,
      priorityType,
      checkList,
      dueDate,
      taskType,
      id
    );

    if (response) {
      settoggleEditTask(false);
      setTitle("");
      setPriorityType("");
      setCheckList([]);
      setcountCheckList(0);
      setDate("");
      setDisableButton(true);
      setnewTask(newtask+1);
    }
  };
// change task type by cllicking on chip
  const changeType=async(type,id)=>{
        const response = await ChangeTaskType(type,id)
        if(response){
            setnewTask(newtask+1);
        }
  }


  const handleEditToggle = (title,type,priorityType,checkList,dueDate,count,objectId) => {

     settoggleEditTask(!toggleEditTask);
      setTitle(title);
      setTaskType(type)
      setPriorityType(priorityType);
      setCheckList(checkList);
      setcountCheckList(count);
      setDate(dueDate?dueDate.split("-").join("/"):"");
      setId(objectId);
  };

      useEffect(() => {
        validateButton();
      }, [title, priorityType, countCheckList]);

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
    <EditTaskContext.Provider
      value={{
        toggleEditTask,
        title,
        PriorityButton,
        HandleTitleChange,
        AddCheckList,
        countCheckList,
        checkList,
        ToggleChecked,
        RemoveCheckList,
        HandleChecklistValue,
        ConvertDate,
        date,
        disbaleButton,
        handleEditToggle,
        settoggleEditTask,
        Savedata,
        changeType
      }}>
      {props.children}
    </EditTaskContext.Provider>
  );
};

export default EditTaskState;
