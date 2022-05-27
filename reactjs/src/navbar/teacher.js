
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/home";
import Profile from "../components/profile";
import Dashboard from "../components/dashboard";
import AuthUser from "../components/AuthUser";
import TeacherCourse from "../components/teacherCourse";
import AddAnouncement from "../components/addAnnouncement";
import AddAssignment from "../components/addAssignment";
import TeacherDashboard from "../components/teacherDashboard";
import TeacherGrades from "../components/teacherViewGrades";


function Teacher() {
  const {token, logout} = AuthUser();

  const logoutUser = () => {
    if (token !== undefined){
      logout();
    }
  }


  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/teacher/courses">
              Courses
            </Link>
          </li>
          <li className="nav-item">
            <span role="button" className="nav-link" onClick={logoutUser}>
              Logout
            </span>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<TeacherDashboard />} />
          <Route path="/teacher/courses" element={<TeacherCourse />} />
          <Route
            path="/teacher/courses/addAnouncement"
            element={<AddAnouncement />}
          />
          <Route
            path="/teacher/courses/addAssignment"
            element={<AddAssignment />}
          />
          <Route
            path="/teacher/course/assignment"
            element={<TeacherGrades />}
          />
        </Routes>
      </div>
    </>
  );
}

export default Teacher;
