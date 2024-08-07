import React, { useContext, useRef } from "react";
import style from "./EditTask.module.css";
import CreateTaskContext from "../../context/CreateTask/CreateTaskContext";
import { FaStarOfLife } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { MdCheckBox } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import EditTaskContext from "../../context/EditTask/EditTaskContext";


const EditTask = () => {

  const EditdateRef = useRef();
  const {
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
        settoggleEditTask,
        Savedata
  } = useContext(EditTaskContext);

  

  const Button = ({ text, color, bgcolor, bdColor, click, disabled, disabledColor }) => {
    return (
      <button className={style.btnComp} onClick={click} disabled={disabled}
          style={{
            color:`${color}`,
            background:disabled?`${disabledColor}`:`${bgcolor}`,
            border:bdColor?`1px solid ${bdColor}`:"none",
        }}
          >
        {text}
      </button>
    );
  };

  return (
    <div className={style.Container}>
      <div className={style.PopUp}>
        <div className={style.TileContainer}>
          <div className={style.TitleHeading}>
            Title<FaStarOfLife className={style.RequiredIcon} />
          </div>
          <div className={style.InputBox}>
            <input
              value={title}
              onChange={HandleTitleChange}
              type="text"
              placeholder="Enter task Title"
            />
          </div>
        </div>
        <div className={style.PrioritySection}>
          <span className={style.TitleHeading}>
            Select Priority <FaStarOfLife className={style.RequiredIcon} />
          </span>
          <div className={style.PriorityType}>
            <PriorityButton text={"HIGH PRIORITY"} color={"#FF2473"} />
            <PriorityButton text={"MODERATE PRIORITY"} color={"#18B0FF"} />
            <PriorityButton text={"LOW PRIORITY"} color={"#63C05B"} />
          </div>
        </div>
        <div className={style.CheckListContainer}>
          <div className={`${style.CheckListHeading} ${style.TitleHeading}`}>
            Checklist (
            {
              checkList.filter(({ checked }) => {
                return checked === true;
              }).length
            }
            /{countCheckList}) <FaStarOfLife className={style.RequiredIcon} />
          </div>
          <div className={style.CheckListInput}>
            {checkList.length > 0
              ? checkList.map(({ value, checked, countCheckList }, i) => {
                  return (
                    <div className={style.CheckListInputBox} key={i}>
                      {checked ? (
                        <MdCheckBox
                          onClick={() => ToggleChecked(i)}
                          className={style.checkBox}
                          style={{ color: "#17A2B8", left: "1rem" }}
                        />
                      ) : (
                        <MdCheckBoxOutlineBlank
                          onClick={() => ToggleChecked(i)}
                          className={style.checkBox}
                          style={{ color: "#E2E2E2", left: "1rem" }}
                        />
                      )}
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => HandleChecklistValue(e, i)}
                      />
                      <MdDelete
                        onClick={() => RemoveCheckList(i)}
                        className={style.checkBox}
                        style={{ color: "#CF3636", right: "1rem" }}
                      />
                    </div>
                  );
                })
              : null}
          </div>
          <div className={style.AddCheckPoints} onClick={AddCheckList}>
            <GoPlus />
            <span>Add New</span>
          </div>
        </div>
        <div className={style.ButtonSec}>
          <div
            className={style.Btnleft}
            onClick={() => EditdateRef.current.showPicker()}>
            {date ? date : "Select Due Date"}
            <input
              onClick={() => EditdateRef.current.dataset}
              ref={EditdateRef}
              type="date"
              min={(() => {
                const date = new Date().toISOString();
                return date.substring(0, date.indexOf("T"));
              })()}
              onChange={ConvertDate}
            />
          </div>
          <div className={style.Btnright}>
            <div className={`${style.btn}`}></div>
            <Button
              color={"#CF3636"}
              text={"Cancel"}
              bdColor={"#CF3636"}
              bgcolor={"#FFFFFF"}
              disabled={false}
              click={()=>settoggleEditTask(!toggleEditTask)}
            />
            <Button
                color={"#FFFFFF"}
                text={"Save"}
                bgcolor={"#17A2B8"}
                disabled={disbaleButton}
                click={()=>Savedata()}
                disabledColor={"#17a2b8a1"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
