import { useState, useEffect } from "react";
import AuthUser from "./AuthUser";
import { Link, useNavigate, useLocation } from "react-router-dom";

function VerifyAnswer() {
  const { http } = AuthUser();
  const location = useLocation();

  const [allUsers, setAllUsers] = useState([]);
  const [targetUser, setTargetUser] = useState([]);
  const [isExist, setIsExist] = useState(false);

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
  console.log(targetUser);

  if (isExist) {
    return <div>user exist</div>;
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
