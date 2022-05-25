import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

const PanelPage = (props) => {
  return (
    <MDBContainer>
      <MDBCard style={{marginTop: "1rem" }}>
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
        <h3 style={{marginTop:"1rem"}}>To Do</h3>
        {PanelPage()}
        {PanelPage()}
        {PanelPage()}
        <h3 style={{marginTop:"1rem"}}>Past incoming</h3>
        {PanelPage()}
        <h3 style={{marginTop:"1rem"}}>Past</h3>
        {PanelPage()}
      </>
  );
}

export default StudentDashboard;
