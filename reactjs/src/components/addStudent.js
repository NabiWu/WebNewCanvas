import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthUser from "./AuthUser";
import {getAllStudents} from "./addCourse"
import { MDBDataTable } from "mdbreact";


function AddStudent() {
  const location = useLocation();
  const { http } = AuthUser();
  const [allStudents, setAllStudents] = useState([]);
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [addedStudent, setAddedStudent] = useState();

  let getAllStudents = async () => {
    let data = await http.get("/admin/getAllStudents").then(({ data }) => data);
    setAllStudents(data);
  };

  let getEnrolledStudents = async (course_id) => {
    let data = await http.get("course/" + course_id + "/getAllStudents").then(({ data }) => data);
    setEnrolledStudents(data);
  };

  useEffect(() => {
    getAllStudents();
    getEnrolledStudents(location.state.courseID);
  }, []);


  function isEnrolled(student_id) {
      for (let i = 0; i < enrolledStudents.length; i++) {
        if (student_id === enrolledStudents[i].student_id) {
          return true
        }
      }
      return false
  }

  const submitForm = () => {
    const studentInfo = addedStudent.split(" ");
    let studentId = studentInfo[1];
    http
      .post("course/" + location.state.courseID +"/addStudent/" +studentId)
      .then((res) => {
        if (res.data === "fail") {
          console.log(res)
          alert("cannot add course,reach capacity!")
        }else{
          window.location.reload(false);
        }
      });
  };

  const currStudentsData = {
    columns: [
      {
        label: "role",
        field: "role",
        sort: "asc",
        width: 150,
      },
      {
        label: "Email",
        field: "email",
        sort: "asc",
        width: 270,
      },
      {
        label: "name",
        field: "name",
        sort: "asc",
        width: 200,
      },
      {
        label: "student_id",
        field: "student_id",
        sort: "asc",
        width: 200,
      },
    ],

    rows: enrolledStudents,
  };

  return (
    
    <>
      <MDBDataTable striped bordered small data={currStudentsData} />
      <form>
          <div className="form-group">
            <label>Choose Student:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              defaultValue={"DEFAULT"}
              onChange={(e) => setAddedStudent(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Choose a Student ...
              </option>
              {allStudents.map((student) => {
                if (!isEnrolled(student.id)){
                  return (
                    <option key={student.id}>
                      StudentID: {student.id} {"; "}
                      StudentName: {student.name}
                    </option>
                  );
                }
              })}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={submitForm}
          >
            add Students
          </button>
        </form>
    </>
  );
}

export default AddStudent;
