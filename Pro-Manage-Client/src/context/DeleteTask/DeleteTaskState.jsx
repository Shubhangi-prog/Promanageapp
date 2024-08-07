import DeleteTaskContext from "./DeleteTaskContext";
import { DeleteTask } from "../../apis/TaskApi";
import CreateTaskContext from "../CreateTask/CreateTaskContext";
import DashnavigateContext from "../NavigateDashboard/DashnavigateContext";
import { useContext,useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteTaskState = (props) => {

    const [deletePopUP, setdeletePopUP] = useState(false);
    const {fetchData}=useContext(CreateTaskContext)
    const [id,setId]=useState()
    const { setbacklogtask,setTodo,setprogress,setdone}= useContext(DashnavigateContext)
   
    const Delete =async()=>{
      try {
        const response = await DeleteTask(id);
        if(response){
          setbacklogtask([]);
          setTodo([]);
          setprogress([]);
          setdone([]);
          await fetchData();
          setdeletePopUP(!deletePopUP);
          toast.success(response.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
  
    }
  

  return (
    
    <DeleteTaskContext.Provider value={{deletePopUP,setdeletePopUP,Delete,setId}}>
        {props.children}
    </DeleteTaskContext.Provider>
  )
}

export default DeleteTaskState