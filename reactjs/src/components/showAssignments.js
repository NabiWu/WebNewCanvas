import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthUser from "./AuthUser";

function ShowAssignments() {
    const location = useLocation();
    const { http } = AuthUser();

    let id = location.state['courseID'];
    const [assigns, setAnns] = useState([]);
    const [loading, setLoading] = useState(true);

    let getAssign = async () => {
        let data = await http.get(`/course/${id}/assignments`).then(({ data }) => data);
        setAnns(data);
        setLoading(false);
    }
    useEffect(
        () => {
            getAssign();
        }
        , []
    )
    let assign_cards;
    console.log(assigns.length)

    if (assigns.length === 0) {
        assign_cards = <>
            <div>Cong! No assignments so far!</div>
        </>
    } else {
        assign_cards = assigns.map((assign, idx) => {
            return (
                <div key={assign.id}>
                    <div className="card">
                        <div className="card-header"> assignments {idx + 1}</div>
                        <div className="card-body">
                            <Link to="/course/assignment">
                                <h3 className="card-title">{assign.title}</h3>
                            </Link>
                            <pre className="card-text">{assign.description}</pre>
                            <p className="card-text">points: {assign.max_points} <b> || due date: {assign.due_date}</b></p>
                        </div>
                    </div>
                    <br></br>
                </div>
            );
        });
    }

    return (
        <React.Fragment>
            <h2>Assignments of {location.state['courseName']}</h2>
            <hr></hr>
            {loading ? <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div> :
                <div>
                    {assign_cards}
                </div>

            }
        </React.Fragment>
    );
}

export default ShowAssignments;
