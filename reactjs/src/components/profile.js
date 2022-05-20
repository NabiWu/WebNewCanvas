import { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
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

  const editChange = () => {
    console.log('haha')
  };

  function renderElement() {
    if (userdetail) {
      if (userdetail.isActive === "false") {
        return <h1>Your account is not active, please contact Admin!!</h1>;
      } else {
        return (
          <>
            <div>
              <h4>Name</h4>
              <p>{userdetail.name}</p>
              <h4>Email</h4>
              <p>{userdetail.email}</p>
              <h4>Role</h4>
              <p>{userdetail.role}</p>
              <h4>Role</h4>
              <p>{userdetail.id}</p>
            </div>
            <Card>
              <Card.Header>My Information</Card.Header>
              <Card.Body>
                <Card.Title>{userdetail.name}</Card.Title>
                <Card.Text>Email: {userdetail.email}</Card.Text>
                <Card.Text>Role: {userdetail.role}</Card.Text>
                <Card.Text>ID: {userdetail.id}</Card.Text>
                <Button variant="primary" onClick={editChange}>Go somewhere</Button>
              </Card.Body>
            </Card>
          </>
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
