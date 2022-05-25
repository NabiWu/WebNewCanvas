import { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import AuthUser from "./AuthUser";

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

export default function Profile() {
  const { http } = AuthUser();
  const [userdetail, setUserdetail] = useState("");
  const [show, setShow] = useState(false);

  const [newName, setNewName] = useState();
  const [newEmail, setNewEmail] = useState();
  const [newQues1, setNewQues1] = useState();
  const [newQues2, setNewQues2] = useState();
  const [newQues3, setNewQues3] = useState();
  const [newAns1, setNewAns1] = useState();
  const [newAns2, setNewAns2] = useState();
  const [newAns3, setNewAns3] = useState();

  const handleClose = () => setShow(false);
  const handleShow = async () => {
    await setNewName(userdetail.name);
    await setNewEmail(userdetail.email);
    await setNewQues1(userdetail.ques1);
    await setNewQues2(userdetail.ques2);
    await setNewQues3(userdetail.ques3);
    await setNewAns1(userdetail.ans1);
    await setNewAns2(userdetail.ans2);
    await setNewAns3(userdetail.ans3);
    setShow(true);
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

  const fetchUserDetail = async () => {
    await http.get("/me").then((res) => {
      setUserdetail(res.data);
    });
  };

  const updateInfo = async () => {
    await http.put("/profile", {
      id: userdetail.id,
      name: newName,
      email: newEmail,
      ques1: newQues1,
      ques2: newQues2,
      ques3: newQues3,
      ans1: newAns1,
      ans2: newAns2,
      ans3: newAns3,
    });
    setShow(false);
    window.location.reload(false);
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
                  <div className="form-group">
                    <label>Security Question1:</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setNewQues1(e.target.value)}
                    >
                      <option value="DEFAULT">{userdetail.ques1}</option>
                      {Questions.map((question) => {
                        return (
                          <option key={question.id}>{question.question}</option>
                        );
                      })}
                    </select>
                  </div>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Answer1</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userdetail.ans1}
                      onChange={(e) => setNewAns1(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <div className="form-group">
                    <label>Security Question2:</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setNewQues2(e.target.value)}
                    >
                      <option value="DEFAULT">{userdetail.ques2}</option>
                      {Questions.map((question) => {
                        return (
                          <option key={question.id}>{question.question}</option>
                        );
                      })}
                    </select>
                  </div>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Answer2</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userdetail.ans2}
                      onChange={(e) => setNewAns2(e.target.value)}
                      autoFocus
                    />
                  </Form.Group>
                  <div className="form-group">
                    <label>Security Question3:</label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      defaultValue={"DEFAULT"}
                      onChange={(e) => setNewQues3(e.target.value)}
                    >
                      <option value="DEFAULT">{userdetail.ques3}</option>
                      {Questions.map((question) => {
                        return (
                          <option key={question.id}>{question.question}</option>
                        );
                      })}
                    </select>
                  </div>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Answer3</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={userdetail.ans3}
                      onChange={(e) => setNewAns3(e.target.value)}
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
