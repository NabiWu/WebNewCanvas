import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthUser from "./AuthUser";
import { Card, Button, Modal, Form } from "react-bootstrap";

function ShowStudentAssignments() {
  const location = useLocation();
  const { http, user } = AuthUser();

  let id = location.state["courseID"];
  const [assigns, setAnns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedShow, setSubmittedShow] = useState(false);
  const [unsubmittedShow, setUnsubmittedShow] = useState(false);
  const [grade, setGrade] = useState();
  const [submittedAnswer, setSubmittedAnswer] = useState();
  const handleUnSubmittedClose = () => setUnsubmittedShow(false);
  const handleSubmittedClose = () => setSubmittedShow(false);
  const [answer, setAnswer] = useState();
  const [submission, setSubmission] = useState();
  const [assiId, setAssiId] = useState();
  const processSubmission = async (data) => {
    if (!data) {
      return;
    }
    if (data.length === 0) {
      setUnsubmittedShow(true);
    } else {
      data = data[0];
      if (data.grade === -1) {
        await setGrade("not graded yet");
      } else {
        await setGrade(data.grade);
      }
      await setSubmittedAnswer(data.answer);
      setSubmittedShow(true);
    }
  };

  const handleShowWhichTable = async (item) => {
    let data = await http
      .get("student/" + user["id"] + "/assignment/" + item.id)
      .then(({ data }) => data);
    setSubmission(data);
    setAssiId(item.id);
  };
  useEffect(() => {
    processSubmission(submission);
  }, [submission]);

  const unsubmitAnswerModel = () => {
    return (
      <Modal show={unsubmittedShow} onHide={handleUnSubmittedClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Grade:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Answer</Form.Label>
              <Form.Control
                type="text"
                defaultValue={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Grade</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setGrade(e.target.value)}
                autoFocus
              />
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleUnSubmittedClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitAnswer}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const submitAnswerModel = () => {
    return (
      <Modal show={submittedShow} onHide={handleSubmittedClose}>
        <Modal.Header closeButton>
          <Modal.Title>View My Grade:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Answer</Form.Label>
              <Form.Control
                type="text"
                defaultValue={submittedAnswer}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Grade</Form.Label>
              <Form.Control type="text" defaultValue={grade} disabled />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleSubmittedClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  let getAssign = async () => {
    let data = await http
      .get(`/course/${id}/assignments`)
      .then(({ data }) => data);
    setAnns(data);
    setLoading(false);
  };
  useEffect(() => {
    getAssign();
  }, []);
  let assign_cards;

  if (assigns.length === 0) {
    assign_cards = (
      <>
        <div>Cong! No assignments so far!</div>
      </>
    );
  } else {
    assign_cards = assigns.map((assign, idx) => {
      return (
        <div key={assign.id}>
          <div className="card">
            <div className="card-header"> assignments {idx + 1}</div>
            <div className="card-body">
              {/* course_id: location.state["courseID"],
                  assign_id: assign.id,
                  title: assign.title,
                  description: assign.description,
                  max_points: assign.max_points,
                  due_date: assign.due_date, */}
              <button onClick={() => handleShowWhichTable(assign)}>
                <h3 className="card-title">{assign.title}</h3>
              </button>
              <pre className="card-text">{assign.description}</pre>
              <p className="card-text">
                points: {assign.max_points}{" "}
                <b> || due date: {assign.due_date}</b>
              </p>
            </div>
          </div>
          <br></br>
        </div>
      );
    });
  }
  const submitAnswer = async () => {
      await http.post("student/" + user["id"] + "/assignment/" + assiId, {
        student_id: user.id,
        course_id: id,
        assignment_id: assiId,
        grade: grade,
      });
    handleUnSubmittedClose();
    window.location.reload(false);
  };

  return (
    <React.Fragment>
      <h2>Assignments of {location.state["courseName"]}</h2>
      <hr></hr>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>{assign_cards}</div>
      )}
      {unsubmitAnswerModel()}
      {submitAnswerModel()}
    </React.Fragment>
  );
}

export default ShowStudentAssignments;
