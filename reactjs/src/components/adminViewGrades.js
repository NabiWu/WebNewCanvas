import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import AuthUser from "./AuthUser";
import { MDBDataTable } from "mdbreact";

function AdminGrades() {
  const { http } = AuthUser();
  const location = useLocation();

  const [gradedAssi, setGradedAssi] = useState([]);
  const [submittedUngradedAssi, setSubmittedUngradedAssi] = useState([]);
  const [unsubmitted, setUnsubmittedAssi] = useState([]);
  console.log(location.state);

  useEffect(() => {}, []);

  const gradedData = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Grade",
        field: "grade",
        sort: "asc",
        width: 200,
      },
    ],
    rows: [],
  };
  const submittedUngradedData = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],
    rows: [],
  };

  const unsubmittedData = {
    columns: [
      {
        label: "Name",
        field: "name",
        sort: "asc",
        width: 150,
      },
    ],
    rows: [],
  };

  return (
    <>
      <h3>Graded Students</h3>
      <MDBDataTable striped bordered small data={gradedData} />
      <h3>Ungraded Students</h3>
      <MDBDataTable striped bordered small data={submittedUngradedData} />
      <h3>Unsubmitted Students</h3>
      <MDBDataTable striped bordered small data={unsubmittedData} />
    </>
  );
}

export default AdminGrades;
