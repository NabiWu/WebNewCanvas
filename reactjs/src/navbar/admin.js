
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "../components/home";
import Profile from "../components/profile";
import AdminDashboard from "../components/adminDashboard";
import AuthUser from "../components/AuthUser";
import Setting from "../components/setting";
import AdminCourse from "../components/adminCourse";
import AddCourse from "../components/addCourse";
import AddStudent from "../components/addStudent";
import ShowAnnouncements from "../components/showAnnouncements";
import ShowAdminAssignments from "../components/showAdminAssignments";
import AdminGrades from "../components/adminViewGrades";


function Admin() {
  const { token, logout } = AuthUser();

  const logoutUser = () => {
    if (token !== undefined) {
      logout();
    }
  }



  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/dashboard">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/setting">
              Setting
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/admin/courses">
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
          <Route exact path="/" element={<Navigate replace to="/profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/admin/courses" element={<AdminCourse />} />
          <Route path="/admin/courses/addCourse" element={<AddCourse />} />
          <Route
            path="/admin/courses/addStudentToCourse"
            element={<AddStudent />}
          />
          <Route
            path="/courses/:id/announcements"
            element={<ShowAnnouncements />}
          />
          <Route
            path="/courses/:id/assignments"
            element={<ShowAdminAssignments />}
          />
          <Route
            path="/admin/course/assignment"
            element={<AdminGrades />}
          />
        </Routes>
      </div>
    </>
  );
}

export default Admin;
