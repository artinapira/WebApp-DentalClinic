import React, { useState, useEffect } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { GiNurseFemale } from "react-icons/gi";
import { SlUserFollow } from "react-icons/sl";
import { BsBookmarkPlus, BsFillBookmarkCheckFill } from "react-icons/bs";
import { BiDetail } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaHospitalUser,FaUserDoctor } from "react-icons/fa";
import { TbReportMedical } from "react-icons/tb";
import { MdBedroomChild } from "react-icons/md";
import { Link } from "react-router-dom";
import { ImMenu } from "react-icons/im";
import { FiLogOut } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import { TbBed } from "react-icons/tb";
import { MdDashboardCustomize } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { GetAdminProfile, GetDentistProfile } from "../../../../../redux/auth/action";
import "./CommonCSS.css";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  function toggle() {
    setIsOpen(!isOpen);
  }

  const { token1, dentist, admin } = useSelector((store) => store.auth.data);

  console.log('Token from sidebar:', token1);
console.log('Data of dentist sidebar',dentist);
console.log('Data of admin sidebar',admin);


  useEffect(() => {


    dispatch(GetDentistProfile(token1)).then((res) => console.log(res));
    dispatch(GetAdminProfile(token1)).then((res) => console.log(res));


  }, [])




  return (
    <>

      <div>
        <div style={{ width: isOpen ? "200px" : "70px" }} className={`sidebar1`}>
          <div className="top_section1">
            <h1 style={{ display: isOpen ? "block" : "none" }} className="logo1">
              Margin
            </h1>
            <div
              style={{ marginLeft: isOpen ? "50px" : "0px" }}
              className="bars1"
            >
              <ImMenu onClick={toggle} style={{ cursor: "pointer1" }} />
            </div>
          </div>
          <div className="bottomSection">
            <Link className="link1" activeclassname="active" to={"/dashboard"}>
              <div className="icon1">
                <MdDashboardCustomize className="mainIcon1" />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text1"
              >
                DashBoard
              </div>
            </Link>

            {admin?.adminId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/Add_Patient"}
              >
                <div className="icon1">
                  <FaHospitalUser className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Add Patient
                </div>
              </Link>
            ) : null}
            

            {admin?.adminId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/Add_Terminet"}
              >
                <div className="icon1">
                  <BsBookmarkPlus className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Appointments
                </div>
              </Link>
            ) : null}
            {admin?.adminId ? (
              <Link className="link1" activeclassname="active" to={"/Add_Dentist"}>
                <div className="icon1">
                  <AiOutlineUserAdd className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Add Dentist
                </div>
              </Link>
            ) : null}

            {admin?.adminId ? (
              <Link className="link1" activeclassname="active" to={"/Add_Admin"}>
                <div className="icon1">
                  <RiAdminLine
                    className="mainIcon1"
                    style={{ color: "white" }}
                  />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text11"
                >
                  Add Admin
                </div>
              </Link>
            ) : null}


            {dentist?.dentistId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/DentistProfile"}
              >
                <div className="icon1">
                  <SlUserFollow className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Profile
                </div>
              </Link>
            ) : null}
           
            {dentist?.dentistId ? (
              <Link className="link1" activeclassname="active" to={"/reports"}>
                <div className="icon" style={{marginLeft:'-1%'}}>
                  <TbReportMedical className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Reports
                </div>
              </Link>
            ) : null}
            {dentist?.dentistId ? (
              <Link
                className="link1"
                activeclassname="active"
                to={"/checkappointment"}
              >
                <div className="icon1">
                  <BsFillBookmarkCheckFill className="mainIcon1" />
                </div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text1"
                >
                  Appointments
                </div>
              </Link>
            ) : null}
            

            <Link
              className="LogOutPath1 link1"
              onClick={() => {
                dispatch({ type: "AUTH_LOGOUT" });
              }}
              to={"/"}
            >
              <div className="icon1">
                <FiLogOut />
              </div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="link_text1"
              >
                Logout
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
