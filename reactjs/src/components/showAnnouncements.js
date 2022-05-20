import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";

function ShowAnnouncements() {
  const location = useLocation();
  const { http } = AuthUser();

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

  return (
    <>
      <h2>Announcements of {location.state["courseName"]}</h2>
      <hr></hr>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div>{anns_cards}</div>
      )}
    </>
  );
}

export default ShowAnnouncements;
