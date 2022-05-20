import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";

function AddAnouncement() {
  const location = useLocation();
  const navigate = useNavigate();
  const { http } = AuthUser();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const submitForm = () => {
    http
      .post("/course/announcements", {
        title: title,
        content: content,
        course_id: location.state.courseID,
      })
      .then((res) => {
        navigate("/teacher/courses");
      });
  };

  return (
    <>
      <div className="app flex-row align-items-center">
        <h1>Add a New Anouncement!</h1>
        <form>
          <div className="form-group">
            <label>Title</label>
            <input
              type="title"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Content</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
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

export default AddAnouncement;
