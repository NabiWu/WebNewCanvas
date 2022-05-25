import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import React from 'react';
// import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

const PanelPage = (props) => {
  return (
    <MDBContainer style={{ width: '33%'}}>
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
        <h3>Past</h3>
        <div style={{display:"flex", flexWrap: "wrap", justifyContent : "space-between", flexDirection: "row"}}>
                {PanelPage()}
                {PanelPage()}
                {PanelPage()}
                {PanelPage()}
                {/* {PanelPage()} */}
                {PanelPage()}
                <div style={{ width: '33%'}}></div>
        </div>
      </>
  );
}

export default StudentDashboard;
