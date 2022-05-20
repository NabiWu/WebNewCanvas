import { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import AuthUser from "./AuthUser";

export default function Profile() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [show, setShow] = useState(false);

  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setNewName(userdetail.name);
    setNewEmail(userdetail.email);
    setShow(true);
  }

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = () => {
    http.get("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  const updateInfo = () => {

    console.log(newName);
    console.log(newEmail);
    setShow(false);
  };

  const editChange = () => {};

  function renderElement() {
    if (userdetail) {
      if (userdetail.isActive === "false") {
        return <h1>Your account is not active, please contact Admin!!</h1>;
      } else {
        return (
          <>
            <br />
            <Card>
              <Card.Header>My Information</Card.Header>
              <Card.Body>
                <Card.Title>{userdetail.name}</Card.Title>
                <Card.Text>Email: {userdetail.email}</Card.Text>
                <Card.Text>Role: {userdetail.role}</Card.Text>
                <Card.Text>ID: {userdetail.id}</Card.Text>
                <Button variant="primary" onClick={handleShow}>
                  Edit Your Profile
                </Button>
              </Card.Body>
            </Card>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Your Profile:</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userdetail.name}
                      onChange={(e) => setNewName(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      defaultValue={userdetail.email}
                      onChange={(e) => setNewEmail(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={updateInfo}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
      }
    } else {
      return (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      );
    }
  }

  return <div>{renderElement()}</div>;
}
