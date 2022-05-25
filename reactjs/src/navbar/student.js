
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/home";
import Profile from "../components/profile";
import Dashboard from "../components/dashboard";
import AuthUser from "../components/AuthUser";
import StudentCourse from "../components/studentCourse";
import StudentDashboard from "../components/studentDashboard";

function Student() {
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
            <Link className="nav-link" to="/student/courses">
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
          <Route path="/dashboard" element={<StudentDashboard />} />
          <Route path="/student/courses" element={<StudentCourse />} />
        </Routes>
      </div>
    </>
  );
}

export default Student;
