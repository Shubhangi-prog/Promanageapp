import { useState } from "react"
import BoardFilterContext from "./BoardFilterContext"

const BoardFilterState = (props) => {
    const[FilterSelected,setFilterSelected]=useState('This week');
    const [filterPopUp,setfilterPopUp]=useState(false);
    const[userName,setUserName]=useState("");
    
    const selectFilter=(filter)=>{
        setFilterSelected(filter);
        setfilterPopUp(!filterPopUp)
    }

    const HandleChangeUserName=(e)=>{
      setUserName(e.target.value);
    }

    const popUp=()=>{
      setfilterPopUp(!filterPopUp)
    }
  return (
    <BoardFilterContext.Provider value={{FilterSelected,setFilterSelected,selectFilter,filterPopUp,popUp,userName,HandleChangeUserName,setUserName}}>
        {props.children}
    </BoardFilterContext.Provider>
  )
}

export default BoardFilterState