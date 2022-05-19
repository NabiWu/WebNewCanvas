import { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function AdminCourse() {
  const { http } = AuthUser();
  let navigate = useNavigate();
  const [allCourses, setAllCourse] = useState([]);

  let getAllCourses = async () => {
    let data = await http.get("/admin/getAllCourses").then(({ data }) => data);
    setAllCourse(data);
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const goToCreateCoursePage = () => {
    let path = `./addCourse`;
    navigate(path);
  };
  return (
    <>
      <div className="app flex-row align-items-center">
        <br />
        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={goToCreateCoursePage}
        >
          Add New Course
        </button>
      </div>
      <br />
      <br />
      <br />
      {allCourses.map((course) => {
        let ann_url = `/courses/${course.id}/announcements`;
        return (
          <div key={course.id}>
            <div className="card">
              <div className="card-header">Course</div>
              <div className="card-body">
                <h5 className="card-title">{course.name}</h5>
                <p className="card-text">{course.description}</p>
                <Link
                  to="/admin/courses/addStudentToCourse"
                  className="btn btn-primary"
                  state={{
                    courseID: course.id,
                    courseName: course.name,
                    courseDescription: course.description,
                    courseCapacity: course.capacity,
                    courseTeacher: course.teacher_id
                  }}
                >
                  Add Students
                </Link>
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
              </div>
            </div>
            <br></br>
          </div>
        );
      })}
    </>
  );
}

export default AdminCourse;
