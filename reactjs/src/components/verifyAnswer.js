import { useState, useEffect } from "react";
import AuthUser from "./AuthUser";
import { Link, useNavigate, useLocation } from "react-router-dom";

function VerifyAnswer() {
  const { http } = AuthUser();
  const location = useLocation();

  const [allUsers, setAllUsers] = useState([]);
  const [targetUser, setTargetUser] = useState([]);
  const [isExist, setIsExist] = useState(false);

  const [answer1, setAns1] = useState();
  const [answer2, setAns2] = useState();
  const [answer3, setAns3] = useState();

  let getAllUsers = async () => {
    let data = await http.get("/admin/getAllUsers").then(({ data }) => data);
    setAllUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    let result = checkEmail(allUsers, location.state.email);
    setTargetUser(result[0]);
    setIsExist(result[1]);
  }, [allUsers]);

  function checkEmail(allUsers, email) {
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].email === email) {
        return [allUsers[i], true];
      }
    }
    return [[], false];
  }

  if (isExist) {
    return (
      <div className="row justify-content-center pt-5">
        <div className="col-sm-6">
          <div className="card p-4">
            <h1 className="text-center mb-3">Answer Secure Questions </h1>
            <div className="form-group">
              <label>{targetUser.ques1}</label>
              <input
                type="test"
                className="form-control"
                placeholder="Enter answer"
                onChange={(e) => setAns1(e.target.value)}
                id="ans1"
              />
            </div>
            <div className="form-group">
              <label>{targetUser.ques2}</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter answer"
                onChange={(e) => setAns2(e.target.value)}
                id="ans2"
              />
            </div>
            <div className="form-group">
              <label>{targetUser.ques3}</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter answer"
                onChange={(e) => setAns3(e.target.value)}
                id="ans3"
              />
            </div>

            <Link
              to="/resetpassword/reset"
              className="btn btn-primary mt-4"
              state={{
                targetUser: targetUser,
                answer1: answer1,
                answer2: answer2,
                answer3: answer3,
              }}
            >
              Check And Reset
            </Link>
            <Link to="/resetpassword" className="link-secondary text-center">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="row justify-content-center pt-5">
        <div className="col-sm-6">
          <div className="card p-4">
            <h1 className="text-center mb-3">Email Invalid </h1>
            <Link to="/resetpassword" className="btn btn-primary mt-4">
              Back
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyAnswer;
