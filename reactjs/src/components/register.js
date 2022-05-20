import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/;

export default function Register() {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();
  const { http, setToken } = AuthUser();

  const [name, setName] = useState("");
  const [validName, setValidName] = useState(false);

  const [email, setEmail] = useState();
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState();
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  const [role, setRole] = useState("student");

  useEffect(() => {
    const result = USER_REGEX.test(name);
    setValidName(result);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    // console.log(result);
    // console.log(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  const submitForm = () => {
    if (!validName || !validEmail) {
      alert("Invalide Username or Invalid Email Address!");
    } else if (!validPassword) {
      alert("Invalide Password!");
    } else if (!validMatch) {
      alert("Passwords aren't Matched!");
    } else {
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
    }
  };

  return (
    <div className="row justify-content-center pt-5">
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
              defaultChecked
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
              ref={userRef}
            />
            <p className="text-muted small">
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>
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
            <p className="text-muted small">
              5 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          </div>

          <div className="form-group mt-3">
            <label>Confirm Password:</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setMatchPassword(e.target.value)}
              id="matchPwd"
            />
            <p className="text-muted small">
              Must match the first password input field.
            </p>
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
