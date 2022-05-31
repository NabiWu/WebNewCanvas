
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "../components/home";
import Login from "../components/login";
import Register from "../components/register";
import VerifyEmail from "../components/verifyEmail";
import VerifyAnswer from "../components/verifyAnswer";
import FinalizePassword from "../components/finalizePassword";

function Guest() {



  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Routes>
          <Route exact path="/" element={<Navigate replace to="/login" />} />
          <Route path="/resetpassword" element={<VerifyEmail />} />
          <Route
            path="/resetpassword/securityQestion"
            element={<VerifyAnswer />}
          />
          <Route
            path="/resetpassword/reset"
            element={<FinalizePassword />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </>
  );
}

export default Guest;
