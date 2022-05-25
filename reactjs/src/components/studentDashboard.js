import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";
import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from "mdbreact";

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
          <Link className="nav-link" to="/">
            Home
          </Link>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
function StudentDashboard() {
  const { http, user } = AuthUser();
  let navigate = useNavigate();
  const [TODOAssin, setTODOAssin] = useState([]);
  const [IncomingAssin, setIncomingAssin] = useState([]);
  const [PastAssin, setPastAssin] = useState([]);

  let getAllAssins = async () => {
    let id = user['id'];
    let data = await http.get(`/student/${id}/assignments`).then(({ data }) => data);
    // setAllAssins(data);
    let _TODOAssin = data.filter((item) => {
      let cur_add_3 = addDays(new Date(), 3);
      console.log(cur_add_3);
      let due = new Date(item['due_date']);
      return cur_add_3 >= due;
    });

    let _IncomingAssin = data.filter((item) => {
      let cur_add_3 = addDays(new Date(), 3);
      console.log(cur_add_3);
      let due = new Date(item['due_date']);
      return cur_add_3 < due;

    });

    let _PastAssin = data.filter((item) => {
      let due = new Date(item['due_date']);
      return Date() >= due;
    });

    setTODOAssin(_TODOAssin);
    setIncomingAssin(_IncomingAssin);
    setPastAssin(_PastAssin);

  }

  useEffect(() => {
    getAllAssins();
  }, []);

  return (
    <>
      <h3 style={{ marginTop: "1rem" }}>To Do</h3>
      {TODOAssin.map((item, idx) => {
        return (<PanelPage assignmentName={item.assignmentName}
          courseName={item.courseName}
          max_points={item.max_points}
          due_date={item.due_date}
        />);
      })}
      <h3 style={{ marginTop: "1rem" }}>Incoming</h3>
      {IncomingAssin.map((item, idx) => {
        return (<PanelPage assignmentName={item.assignmentName}
          courseName={item.courseName}
          max_points={item.max_points}
          due_date={item.due_date}
        />);
      })}
      <h3 style={{ marginTop: "1rem" }}>Past</h3>
      {PastAssin.map((item, idx) => {
        return (<PanelPage assignmentName={item.assignmentName}
          courseName={item.courseName}
          max_points={item.max_points}
          due_date={item.due_date}
        />);
      })}
    </>
  );
}

export default StudentDashboard;
