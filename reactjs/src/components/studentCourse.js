import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";


function StudentCourse() {
  const { http, user } = AuthUser();
  let navigate = useNavigate();
  const [allCourses, setAllCourse] = useState([]);

  let getAllCourses = async () => {
    let id = user['id'];
    console.log(id);
    let data = await http.get(`/student/${id}/courses`).then(({ data }) => data);
    console.log(data)
    setAllCourse(data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <>
      <br />
      <div>
        <h2>
          My Courses
        </h2>
      </div>
      <br />
      <br />
      {allCourses.map((course, idx) => {
        let ann_url = `/courses/${course.id}/announcements`;
        let assign_url = `/courses/${course.id}/assignments`;
        let card_header = `course ${idx + 1}`
        return (
          <div key={course.id}>
            <div className="card">
              <div className="card-header">{card_header}</div>
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <Link
                  to={ann_url}
                  className="btn btn-primary"
                  state={{
                    courseID: course.id,
                    courseName: course.name,
                    courseDescription: course.description,
                    courseCapacity: course.capacity,
                    courseTeacher: course.teacher_id
                  }}
                >
                  See all announcement
                </Link>
                <Link
                  to={assign_url}
                  className="btn btn-primary"
                  state={{
                    courseID: course.id,
                    courseName: course.name,
                    courseDescription: course.description,
                    courseCapacity: course.capacity,
                    courseTeacher: course.teacher_id
                  }}
                >
                  See all assignments
                </Link>
              </div>
            </div>
            <br></br>
          </div>
        );
      })}
    </>
  );
}

export default StudentCourse;
