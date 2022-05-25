import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;
const EMAIL_REGEX = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-z]+)$/;

const Questions = [
  { id: 1, question: "What city were you born in?" },
  { id: 2, question: "What is your oldest sibling’s middle name?r" },
  { id: 3, question: "What was the first concert you attended?" },
  { id: 4, question: "What was the make and model of your first car?" },
  { id: 5, question: "In what city or town did your parents meet?" },
  {
    id: 6,
    question: "What was the name of the boy or the girl you first kissed?",
  },
  { id: 7, question: "What was the first exam you failed?" },
  { id: 8, question: "What is the name of your first school?" },
  { id: 9, question: "What was your favorite food as a child?" },
  {
    id: 10,
    question: "What is the name of your favorite pet?",
  },
];

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

  const [ques1, setQues1] = useState();
  const [ques2, setQues2] = useState();
  const [ques3, setQues3] = useState();
  const [ans1, setAns1] = useState();
  const [ans2, setAns2] = useState();
  const [ans3, setAns3] = useState();

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
          ques1: ques1,
          ques2: ques2,
          ques3: ques3,
          ans1: ans1,
          ans2: ans2,
          ans3: ans3,
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
          <h1 className="text-center mb-1">Register </h1>

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
          <div className="form-group mt-1">
            <label>Email address:</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              id="email"
            />
            <p className="text-muted small">xxx@xxx.xxx</p>
          </div>

          <div className="form-group mt-1">
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
          <div className="form-group mt-1">
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
          <div className="form-group">
            <label>Security Question1:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              defaultValue={"DEFAULT"}
              onChange={(e) => setQues1(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Choose one you like
              </option>
              {Questions.map((question) => {
                return <option key={question.id}>{question.question}</option>;
              })}
            </select>
          </div>
          <div className="form-group mt-1">
            <label>Answer1:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Answer 1"
              onChange={(e) => setAns1(e.target.value)}
              id="ans1"
            />
          </div>
          <div className="form-group">
            <label>Security Question2:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              defaultValue={"DEFAULT"}
              onChange={(e) => setQues2(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Choose one you like
              </option>
              {Questions.map((question) => {
                return <option key={question.id}>{question.question}</option>;
              })}
            </select>
          </div>
          <div className="form-group mt-1">
            <label>Answer2:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Answer 2"
              onChange={(e) => setAns2(e.target.value)}
              id="ans2"
            />
          </div>
          <div className="form-group">
            <label>Security Question3:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              defaultValue={"DEFAULT"}
              onChange={(e) => setQues3(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Choose one you like
              </option>
              {Questions.map((question) => {
                return <option key={question.id}>{question.question}</option>;
              })}
            </select>
          </div>
          <div className="form-group mt-1">
            <label>Answer3:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Answer 3"
              onChange={(e) => setAns3(e.target.value)}
              id="ans3"
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
