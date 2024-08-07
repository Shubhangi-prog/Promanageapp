import React from 'react';
import astro from '../../assets/Astro.png'
import style from './CoverBanner.module.css'
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const CoverBanner = () => {
  function goToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }
  return (
    <div className={style.body}>
        <div className={style.container}>
            <div className={style.ImgContainer} >
                <div className={style.cirlce} ></div>
                <img className={style.AstroImg} src={astro} alt="little Astronaut sitting with laptops on the hand" />
            </div>
            <div className={style.welcomeMsg}>
                <h1>Welcome aboard my friend</h1>
                <h3>just a couple of clicks and we start</h3>
            </div>
        <div className={style.Arrow} onClick={goToBottom}>
          <MdKeyboardDoubleArrowDown className={style.Icon} />
        </div>
        </div>
    </div>
  )
}

export default CoverBanner