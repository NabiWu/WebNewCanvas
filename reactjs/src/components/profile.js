import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";

export default function Profile() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  function renderElement() {
    if (userdetail) {
      if (userdetail.isActive === "false") {
        return <h1>Your account is not active, please contact Admin!!</h1>;
      } else {
        return (
          <div>
            <h4>Name</h4>
            <p>{userdetail.name}</p>
            <h4>Email</h4>
            <p>{userdetail.email}</p>
            <h4>Role</h4>
            <p>{userdetail.role}</p>
          </div>
        );
      }
    } else {
      return <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div>;
    }
  }

  return <div>{renderElement()}</div>;
}
