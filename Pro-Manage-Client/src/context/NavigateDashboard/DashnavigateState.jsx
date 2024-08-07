import React,{ useState} from 'react'
import DashnavigateContext from './DashnavigateContext'
import { useNavigate } from 'react-router-dom';


const DashnavigateState = (props) => {
    const [isSelected,setIsSelected]=useState("Board");
    const [OpenClosePopUp,setOpenClosePopUp]=useState(false)
    const [backlogtask, setbacklogtask] = useState([]);
    const [todo, setTodo] = useState([]);
    const [progress, setprogress] = useState([]);
    const [done, setdone] = useState([]);

    const nav = useNavigate();
    const Select=(select)=>{
        setIsSelected(select)
    }
    const ConfirmLogout=()=>{
      setOpenClosePopUp(!OpenClosePopUp)
    }
    const Logout =()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('analytics');
      setbacklogtask([]);
      setTodo([]);
      setprogress([]);
      setdone([]);
      setOpenClosePopUp(!OpenClosePopUp)
      nav('/login')
    }
  return (
    <DashnavigateContext.Provider value={{isSelected,Select,OpenClosePopUp,ConfirmLogout,Logout,backlogtask, setbacklogtask,todo, setTodo,progress, setprogress,done, setdone}} >
        {props.children}
    </DashnavigateContext.Provider>
  )
}

export default DashnavigateState