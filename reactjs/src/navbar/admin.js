
import { Routes, Route, Link } from "react-router-dom";
import Home from "../components/home";
import Dashboard from "../components/dashboard";
import AuthUser from "../components/AuthUser";

function Auth() {
  const {token, logout} = AuthUser();
  const logoutUser = () => {
    if (token != undefined){
      logout();

    }
  }



  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">
              Dashboard
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/setting">
              Setting
            </a>
          </li>
          <li>
            <a className="nav-link" href="/admin/courses">
              Courses
            </a>
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/setting" element={<Setting />} />
          
          {/* <Route path="/admin/courses" element={<AdminCourse/>}/> */}
        </Routes>
      </div>
    </>
  );
}

export default Auth;
