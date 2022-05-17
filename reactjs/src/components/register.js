import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

export default function Register() {
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [role, setRole] = useState();

  const submitForm = () => {
    // api call
    http
      .post("/register", {
        email: email,
        password: password,
        name: name,
        role: role,
        isActive: "false",
      })
      .then((res) => {
        navigate("/login");
      });
  };

  return (
    <div className="row justify-content-left pt-5">
      <div className="col-sm-6">
        <div className="card p-4">
          <h1 className="text-center mb-3">Register </h1>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              onChange={(e) => setRole("teacher")}
              id="flexRadioDefault1"
            />
            <label className="form-check-label">teacher</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              onChange={(e) => setRole("student")}
              id="flexRadioDefault2"
            />
            <label className="form-check-label">student</label>
          </div>

          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
              id="name"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
          </div>

          <div className="form-group mt-3">
            <label>Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              id="pwd"
            />
          </div>
          <button
            type="button"
            onClick={submitForm}
            className="btn btn-primary mt-4"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
