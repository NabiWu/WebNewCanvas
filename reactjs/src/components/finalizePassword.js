import { useState, useEffect } from "react";
import AuthUser from "./AuthUser";
import { Link, useNavigate, useLocation } from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{5,24}$/;

function FinalizePassword() {
  const { http } = AuthUser();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCorrect, setIsCorrect] = useState(false);

  const [password, setPassword] = useState();
  const [validPassword, setValidPassword] = useState(false);

  const [matchPassword, setMatchPassword] = useState("");
  const [validMatch, setValidMatch] = useState(false);

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    setValidPassword(result);
    const match = password === matchPassword;
    setValidMatch(match);
  }, [password, matchPassword]);

  useEffect(() => {
    let targetUser = location.state.targetUser;
    if (
      targetUser.ans1.toLowerCase() === location.state.answer1.toLowerCase() &&
      targetUser.ans2.toLowerCase() === location.state.answer2.toLowerCase() &&
      targetUser.ans3.toLowerCase() === location.state.answer3.toLowerCase()
    ) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  }, []);

  const updateInfo = async () => {
    if (!validPassword) {
      alert("Password Format Invalid");
    } else if (!validMatch) {
      alert("Passwords Do Not Match");
    } else {
      await http
        .put("/password", {
          id: location.state.targetUser.id,
          password: password,
        })
        .then((res) => {
          navigate("/login");
        });;
    }
  };

  if (isCorrect) {
    return (
      <div className="row justify-content-center pt-5">
        <div className="col-sm-6">
          <div className="card p-4">
            <h1 className="text-center mb-1">Reset Password </h1>

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

            <button
              type="button"
              onClick={updateInfo}
              className="btn btn-primary mt-4"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row justify-content-center pt-5">
        <div className="col-sm-6">
          <div className="card p-4">
            <h1 className="text-center mb-3">Answers Do Not Match </h1>
            <Link to="/resetpassword" className="btn btn-primary mt-4">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default FinalizePassword;
