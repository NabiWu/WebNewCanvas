import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthUser from "./AuthUser";

function AddCourse() {
  const navigate = useNavigate();
  const { http } = AuthUser();
  const [allTeachers, setAllTeachers] = useState([]);
  const [allSatudents, setAllStudents] = useState([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [capacity, setCapacity] = useState();
  const [teacher, setTeacher] = useState();

  let getAllTeachers = async () => {
    let data = await http.get("/admin/getAllTeachers").then(({ data }) => data);
    setAllTeachers(data);
  };

  let getAllStudents = async () => {
    let data = await http.get("/admin/getAllStudents").then(({ data }) => data);
    setAllStudents(data);
  };

  useEffect(() => {
    getAllTeachers();
    getAllStudents();
  }, []);

  const submitForm = () => {
    // api call
    const teacherInfo = teacher.split(" ");
    let teacherID = teacherInfo[1];

    http
      .post("admin/addCourse", {
        capacity: capacity,
        description: description,
        name: name,
        teacher_id: teacherID,
      })
      .then((res) => {
        navigate("/admin/courses");
      });
  };

  return (
    <>
      <div className="app flex-row align-items-center">
        <h1>Lets add courses</h1>
        <form>
          <div className="form-group">
            <label>Class Name</label>
            <input
              type="title"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Capacity</label>
            <input
              type="number"
              className="form-control"
              id="exampleFormControlInput1"
              onChange={(e) => setCapacity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Choose Teacher:</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              defaultValue={"DEFAULT"}
              onChange={(e) => setTeacher(e.target.value)}
            >
              <option value="DEFAULT" disabled>
                Choose a Teacher ...
              </option>
              {allTeachers.map((teacher) => {
                return (
                  <option key={teacher.id}>
                    TeacherID: {teacher.id} {"; "}
                    TeacherName: {teacher.name}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-primary mt-4"
            onClick={submitForm}
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}

export default AddCourse;
