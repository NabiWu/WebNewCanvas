import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function TeacherCourse() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [teachingCourses, setAllTeachingCourses] = useState([]);

  useEffect(() => {
    fetchUserDetail();
  }, []);

  useEffect(() => {
    getAllTeachingCourses();
  }, [userdetail]);

  const fetchUserDetail = () => {
    http.get("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  let getAllTeachingCourses = async () => {
    const getLink = "/teacher/" + String(userdetail.id) + "/getTeachingCourses";
    let data = await http.get(getLink).then(({ data }) => data);
    setAllTeachingCourses(data);
  };



  return (
    <>
      {teachingCourses.map((course) => {
        return (
          <div key={course.id}>
            <div className="card">
              <div className="card-header">Course</div>
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <Link
                  to="/teacher/courses/addAnouncement"
                  className="btn btn-primary"
                  state={{
                    courseID: course.id,
                    courseName: course.name,
                    courseDescription: course.description,
                    courseCapacity: course.capacity,
                    courseTeacher: course.teacher_id,
                  }}
                >
                  Add Announcement
                </Link>
                <Link
                  to="/teacher/courses/addAssignment"
                  className="btn btn-primary"
                  state={{
                    courseID: course.id,
                    courseName: course.name,
                    courseDescription: course.description,
                    courseCapacity: course.capacity,
                    courseTeacher: course.teacher_id,
                  }}
                >
                  Add Assignment
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

export default TeacherCourse;
