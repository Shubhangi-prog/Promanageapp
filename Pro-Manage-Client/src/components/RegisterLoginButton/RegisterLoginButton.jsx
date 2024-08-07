import React from "react";
import styles from "./RegisterLoginButton.module.css";

const RegisterLoginButton = ({ type, text, color, bgcolor, bdcolor,click }) => {
 
  return(
    <button
    onClick={click}
    type={type}
    style={{color:`${color}`,backgroundColor:`${bgcolor}`,border:bdcolor?`1.4px solid ${bdcolor}`:"none"}}
    className={styles.buttonStyle}>{text}</button>
  );
};

export default RegisterLoginButton;
