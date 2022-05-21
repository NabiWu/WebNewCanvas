import { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import AuthUser from "./AuthUser";

export default function AdminDashboard() {
  const { http } = AuthUser();

  const [allUsers, setAllUsers] = useState([]);
  const [numStudents, setNumStudent] = useState([]);
  const [numTeachers, setNumTeacher] = useState([]);

  const [allCourses, setAllCourse] = useState([]);
  const [numCourses, setNumCourses] = useState([]);

  let getAllCourses = async () => {
    let data = await http.get("/admin/getAllCourses").then(({ data }) => data);
    setAllCourse(data);
  };

  let getAllUsers = async () => {
    let data = await http.get("/admin/getAllUsers").then(({ data }) => data);
    setAllUsers(data);
  };

  useEffect(() => {
    getAllUsers();
    getAllCourses();
  }, []);

  useEffect(() => {
    let results = countUser(allUsers);

    setNumStudent(results[0]);
    setNumTeacher(results[1]);
    setNumCourses(allCourses.length);
  }, [allUsers, allCourses]);

  function countUser(allUsers) {
    let students = 0;
    let teachers = 0;
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].role === "student" && allUsers[i].isActive === "true") {
        students++;
      }
      if (allUsers[i].role === "teacher" && allUsers[i].isActive === "true") {
        teachers++;
      }
    }
    return [students, teachers];
  }

  return (
    <div>
      <br/>
      <Card>
        <Card.Header>System Information</Card.Header>
        <Card.Body>
          <Card.Title>Admin Dashboard</Card.Title>
          <Card.Text>No. of Active Teachers: {numTeachers}</Card.Text>
          <Card.Text>No. of Active Students: {numStudents}</Card.Text>
          <Card.Text>No. of Courses: {numCourses}</Card.Text>
          
        </Card.Body>
      </Card>
    </div>
  );
}
