import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function TeacherCourse() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get("/me").then((res) => {
      setUserdetail(res.data);
    });
  };
  return (
    <>
      hello Teacher, here are all courses you are teaching
    </>
  );
}

export default TeacherCourse;
