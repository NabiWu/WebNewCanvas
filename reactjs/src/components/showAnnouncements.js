import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";

function ShowAnnouncements() {
    const location = useLocation();
    const { http } = AuthUser();

    let id = location.state['courseID'];
    const [anns, setAnns] = useState([]);

    let getAnn = async () => {
        let data = await http.get(`/course/${id}/announcements`).then(({ data }) => data);
        setAnns(data);
    }

    useEffect(
        () => {
            getAnn();
        }
        , []
    )


    return (
        <>
            <div>Show Announcements</div>
            {anns.map((ann) => {
                return (
                    <div key={ann.id}>
                        <div className="card">
                            <div className="card-header">Announcement</div>
                            <div className="card-body">
                                <h5 className="card-title">{ann.title}</h5>
                                <p className="card-text">{ann.content}</p>
                            </div>
                        </div>
                        <br></br>
                    </div>
                );
            })}
        </>
    );
}

export default ShowAnnouncements;
