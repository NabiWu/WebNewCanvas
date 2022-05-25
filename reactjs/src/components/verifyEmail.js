import { useState } from "react";
import AuthUser from "./AuthUser";
import { Link } from "react-router-dom";

function VerifyEmail() {
  const [email, setEmail] = useState();

  return (
    <>
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
            <Link
              to="/resetpassword/securityQestion"
              className="btn btn-primary mt-4"
              state={{ email: email }}
            >
              Next
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default VerifyEmail;
