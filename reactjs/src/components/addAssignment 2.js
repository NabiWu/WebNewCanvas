import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  const submitForm = () => {
    http
      .post("/course/assignments", {
        course_id: location.state.courseID,
      })
      .then((res) => {
        navigate("/teacher/courses");
      });
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
              minDate={new Date()}
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
      </div>
    </>
  );
}

export default AddAssignment;
