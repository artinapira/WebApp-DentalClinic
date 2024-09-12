import React from "react";
import { BsFillGearFill } from "react-icons/bs";
import { FaUserMd } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import "./CommonCSS.css";

const Topbar = ({ onclick }) => {
  return (
    <>
      <div className="MainDiv1">
        <div className="Hideshow1">
          <h2>DCMS</h2>
        </div>
        <div className="SearchDiv1">
          <input type="text" placeholder="Search Patient By Id...." />
        </div>
        <div className="IconsDiv1">
          <FaUserMd className="Icons user" />
        </div>
      </div>
    </>
  );
};

export default Topbar;
