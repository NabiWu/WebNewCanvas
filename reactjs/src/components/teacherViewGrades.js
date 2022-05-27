import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AuthUser from "./AuthUser";
import { MDBDataTable } from "mdbreact";
import { Card, Button, Modal, Form } from "react-bootstrap";

function TeacherGrades() {
  const { http } = AuthUser();
  const location = useLocation();

  const [answer, setAnswer] = useState();
  const [submitID, setSubmitID] = useState();
  const [grade, setGrade] = useState();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async (item) => {
    await setAnswer(item.answer);
    await setSubmitID(item.submission_id);
    setShow(true);
  };
  const [allInfo, setAllInfo] = useState([]);
  const [gradedAssi, setGradedAssi] = useState([]);
  const [submittedUngradedAssi, setSubmittedUngradedAssi] = useState([]);
  const [unsubmittedAssi, setUnsubmittedAssi] = useState([]);
  // console.log(location.state);
  // teacher / assignment / { aid };

  let getAssignments = async () => {
    let data = await http
      .get("teacher/assignment/" + location.state.assign_id)
      .then(({ data }) => setAllInfo(data));
  };

  let assignGrade = async (item) => {
    console.log(item);
  };

  useEffect(() => {
    getAssignments();
  }, []);

  useEffect(() => {
    setGradedAssi(
      allInfo.filter((assi) => assi.status === "submitted and graded")
    );
    let ungradedAssiRaw = allInfo.filter(
      (assi) => assi.status === "submitted, not graded"
    );
    let submittedUngradedAssi = [];
    ungradedAssiRaw.map((item, index) => {
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="uil-trash-alt"
            style={{
              cursor: "pointer",
              color: "black",
              fontSize: ".7em",
              padding: ".5rem",
              borderRadius: ".3rem",
              background: "#fb6262",
            }}
            onClick={() => handleShow(item)}
          >
            Assign Grade
          </div>
        </div>
      );
      submittedUngradedAssi.push(item);
    });
    setSubmittedUngradedAssi(submittedUngradedAssi);
    setUnsubmittedAssi(
      allInfo.filter((assi) => assi.status === "not submitted")
    );
  }, [allInfo]);

  const gradedData = {
    columns: [
      {
        label: "Name",
        field: "student_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Grade",
        field: "grade",
        sort: "asc",
        width: 200,
      },
    ],
    rows: gradedAssi,
  };
  const submittedUngradedData = {
    columns: [
      {
        label: "Name",
        field: "student_name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: submittedUngradedAssi,
  };

  const unsubmittedData = {
    columns: [
      {
        label: "Name",
        field: "student_name",
        sort: "asc",
        width: 150,
      },
    ],
    rows: unsubmittedAssi,
  };

  const updateInfo = async () => {
    await http.put("/teacher/giveAGrade", {
      submission_id: submitID,
      grade: grade,
    });
    setShow(false);
    window.location.reload(false);
  };

  return (
    <>
      <h3>Graded Students</h3>
      <MDBDataTable striped bordered small data={gradedData} />
      <h3>Ungraded Students</h3>
      <MDBDataTable striped bordered small data={submittedUngradedData} />
      <h3>Unsubmitted Students</h3>
      <MDBDataTable striped bordered small data={unsubmittedData} />

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Grade:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Answer</Form.Label>
              <Form.Control type="text" defaultValue={answer} disabled />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setGrade(e.target.value)}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateInfo}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TeacherGrades;
