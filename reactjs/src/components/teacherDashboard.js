import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import React from 'react';
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

const PanelPage = (props) => {
  return (
    <MDBContainer>
      <MDBCard style={{ marginTop: "1rem" }}>
        <MDBCardBody>
          <MDBCardTitle>{props.assignmentName}</MDBCardTitle>
          <MDBCardTitle tag="h6" sub className="mb-2 text-muted">
            {props.courseName}
          </MDBCardTitle>
          <MDBCardText>
            {props.max_points} points ||
            due: {props.due_date}

          </MDBCardText>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

function TeacherDashboard() {
  const { http, user } = AuthUser();
  const [PastAssin, setPastAssin] = useState([]);
  let navigate = useNavigate();

  let getAllTeachingAssignment = async () => {
    let id = user['id'];
    const getLink = "/teacher/" + String(id) + "/getTeachingCourses";
    let data = await http.get(getLink).then(({ data }) => data);
    console.log(data)
    let assignments = [];
    for (const element of data) {
      let course_id = element.id;
      console.log(course_id)
      let course_assis = await http.get(`/course/${course_id}/assignments`).then(({ data }) => data);
      // console.log(course_assis)
      course_assis.forEach(assi => {
        assi.courseName = element.name
        assignments.push(assi);
      });
    }
    console.log(assignments)
    let _PastAssin = assignments.filter((item) => {
      let due = new Date(item['due_date']);
      return new Date() >= due;
    });
    console.log(_PastAssin)
    setPastAssin(_PastAssin);
  };

  useEffect(()=>{
    getAllTeachingAssignment();
  },[])

  return (
      <>
      <h3 style={{ marginTop: "1rem" }}>Past</h3>
      {PastAssin.map((item, idx) => {
        return (<PanelPage assignmentName={item.title}
          courseName={item.courseName}
          max_points={item.max_points}
          due_date={item.due_date}
        />);
      })}
      </>
  );
}

export default TeacherDashboard;
