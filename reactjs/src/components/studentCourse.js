import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function StudentCourse() {
  const { http } = AuthUser();
  let navigate = useNavigate();


  return (
    <>
      <div>view my course here</div>
    </>
  );
}

export default StudentCourse;
