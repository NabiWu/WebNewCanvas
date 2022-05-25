import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";

function AddAnouncement() {
  const location = useLocation();
  const navigate = useNavigate();
  const { http } = AuthUser();

  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  let id = location.state["courseID"];
  const [anns, setAnns] = useState([]);
  const [loading, setLoading] = useState(true);

  let getAnn = async () => {
    let data = await http
      .get(`/course/${id}/announcements`)
      .then(({ data }) => data);
    setAnns(data);
    setLoading(false);
  };

  useEffect(() => {
    getAnn();
  }, []);

  let anns_cards;
  if (anns.length === 0) {
    anns_cards = (
      <>
        <div>No announcements!</div>
      </>
    );
  } else {
    anns_cards = anns.map((ann, idx) => {
      return (
        <div key={ann.id}>
          <div className="card">
            <div className="card-header">Announcement {idx + 1}</div>
            <div className="card-body">
              <h5 className="card-title">{ann.title}</h5>
              <p className="card-text">{ann.content}</p>
            </div>
          </div>
          <br></br>
        </div>
      );
    });
  }

  const submitForm = () => {
    http
      .post("/course/announcements", {
        title: title,
        content: content,
        course_id: location.state.courseID,
      })
      .then((res) => {
        window.location.reload(false);
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

        <br />
        <h1>View all Announcement!</h1>
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <div>{anns_cards}</div>
        )}
      </div>
    </>
  );
}

export default AddAnouncement;
