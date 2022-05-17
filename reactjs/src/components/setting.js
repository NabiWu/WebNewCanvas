import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";

export default function Setting() {
  const { http } = AuthUser();

  const [allUsers, setAllUsers] = useState();
  const getAllUsers = () => {
    http.get("/admin/getAllUsers").then((res) => {
      setAllUsers(res.data);
    });
  };

  useEffect(() => {
    getAllUsers();
    console.log(allUsers);
  }, []);

  function renderElement() {
      return (
          <>
          <div>placeholder</div>
          </>
      );
    }
  }

  return <div>{renderElement()}</div>;
}
