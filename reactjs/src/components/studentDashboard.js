import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import React from 'react';
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

const PanelPage = (props) => {
  return (
    <MDBContainer>
      <MDBCard style={{ width: "22rem", marginTop: "1rem" }}>
        <MDBCardBody>
          <MDBCardTitle>props.assignmentName</MDBCardTitle>
          <MDBCardTitle tag="h6" sub className="mb-2 text-muted">
            props.courseName
          </MDBCardTitle>
          <MDBCardText>
            10 points
            due: 05/25/2022
            {/* props.points */}
          </MDBCardText>
          <Link className="nav-link" to="/">
              Home
          </Link>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

function StudentDashboard() {
  const { http } = AuthUser();
  let navigate = useNavigate();

  return (
      <>
        <div style={{display:"flex" ,justifyContent: "space-evenly" }}>
            <div style={{display:"column" }}>
                <h3>To Do</h3>
                {PanelPage()}
                {PanelPage()}
                {PanelPage()}
            </div>
            <div style={{display:"column" }}>
                <h3>Past incoming</h3>
                {PanelPage()}
            </div>
            <div style={{display:"column" }}>
                <h3>Past</h3>
                {PanelPage()}
            </div>
        </div>
      </>
  );
}

export default StudentDashboard;
