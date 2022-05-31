import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { Link } from "react-router-dom";
import $ from 'jquery';

export default function Login() {
  const { http, setToken } = AuthUser();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  useEffect(() => {
    $('#wrong_pwd').hide();
  }, []);
  const submitForm = () => {
    // api call
    http.post("/login", { email: email, password: password }).then((res) => {
      setToken(res.data.user, res.data.access_token);
    }).catch((err) => {
      if (err['response']['status'] === 401) {
        $('#wrong_pwd').show();
        // alert("Wrong username or password!")
      }
    });
  };

  return (
    <>
      <div id="wrong_pwd" className="alert alert-danger" role="alert">
        Wrong username or password!
      </div>
      <div className="row justify-content-center pt-5">
        <div className="col-sm-6">
          <div className="card p-4">
            <h1 className="text-center mb-3">Login </h1>
            <div className="form-group">
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
              Login
            </button>
            <Link to="/resetpassword" className="link-secondary text-center">
              Forget Password
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
