import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthUser from "./AuthUser";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddAssignment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { http } = AuthUser();

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [dueDate, setDueDate] = useState();
  const [maxPoint, setMaxPoints] = useState();

  let id = location.state["courseID"];
  const [assigns, setAnns] = useState([]);
  const [loading, setLoading] = useState(true);

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
  console.log(assigns.length);

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
              <Link
                to="/teacher/course/assignment"
                state={{
                  course_id: location.state["courseID"],
                  assign_id: assign.id,
                  title: assign.title,
                  description: assign.description,
                  max_points: assign.max_points,
                  due_date: assign.due_date,
                }}
              >
                <h3 className="card-title">{assign.title}</h3>
              </Link>
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

  const submitForm = () => {
    http
      .post("/course/assignments", {
        title: title,
        description: description,
        due_date: dueDate.toLocaleDateString(),
        max_points: maxPoint,
        course_id: location.state.courseID,
      })
      .then((res) => {
        window.location.reload(false);
      });
    console.log(title);
    console.log(description);
    console.log(dueDate.toLocaleDateString());
    console.log(maxPoint);
    console.log(location.state.courseID);
  };

  return (
    <>
      <div className="app flex-row align-items-center">
        <h1>Add a New Assignemnt!</h1>
        <form>
          <div className="form-group">
            <label>Title:</label>
            <input
              type="title"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Max Point:</label>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setMaxPoints(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Choose Due Date:</label>
            <DatePicker
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              // minDate={new Date()}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={submitForm}
          >
            Add
          </button>
        </form>

        <br />
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
        </React.Fragment>
      </div>
    </>
  );
}

export default AddAssignment;
