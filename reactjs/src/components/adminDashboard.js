import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function AdminDashboard() {
    const { http } = AuthUser();
    let navigate = useNavigate();

    const [activeStudentNum, setActiveStudentNum] = useState();
    const [courseNum, setCourseNum] = useState();
    const [activeTeacherNum, setActiveTeacherNum] = useState();

    const getActiveStudentNum = () => {
      http.get("/me").then((res) => {
        setActiveStudentNum(0);
      });
    };

    const getCourseNum = () => {
        http.get("/me").then((res) => {
            setCourseNum(0);
        });
    };

    const getActiveTeacherNum = () => {
        http.get("/me").then((res) => {
            setActiveTeacherNum(0);
        });
    };

    useEffect(() => {
        getActiveStudentNum();
        getCourseNum();
        getActiveTeacherNum();
    },[])

    // Number of active students in the system
    // Number of courses in the system
    // Number of active teachers in the system
    return (
        <>
            TODO
            <div>Number of active students in the system : {activeStudentNum}</div>
            <div>Number of courses in the system : {courseNum}</div>
            <div>Number of active teachers in the system : {activeTeacherNum}</div>

        </>
    );
  }
  
  export default AdminDashboard;
  