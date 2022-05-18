import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { MDBDataTable } from "mdbreact";

function Setting() {
  const { http } = AuthUser();
  

  const [allUsers, setAllUsers] = useState([]);
  const [usersForRender, setUsersForRender] = useState([]);

  let getAllUsers = async () => {
    let data = await http.get("/admin/getAllUsers").then(({ data }) => data);
    setAllUsers(data);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  let togleStatus = async (postId) => {
    console.log(postId);
    await http.put("admin/changeStatus", { id: postId });
    window.location.reload(false);
  };

  useEffect(() => {
    let postsArray = JSON.parse(JSON.stringify(allUsers));
    let userData = [];
    postsArray.map((item, index) => {
      item.id = (
        <div style={{ fontWeight: "bold", fontSize: "1.2em" }}>{item.id}</div>
      );
      item.action = (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            className="uil-trash-alt"
            style={{
              cursor: "pointer",
              color: "black",
              fontSize: ".7em",
              padding: ".5rem",
              borderRadius: ".3rem",
              background: "#fb6262",
            }}
            onClick={() => togleStatus(allUsers[index].id)}
          >
            Toggle
          </div>
        </div>
      );
      userData.push(item);
    });
    setUsersForRender(userData);
  }, [allUsers]);

  const data = {
    columns: [
      {
        label: "Name",
        field: "name",
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
        label: "Role",
        field: "role",
        sort: "asc",
        width: 200,
      },
      {
        label: "Active",
        field: "isActive",
        sort: "asc",
        width: 200,
      },
      {
        label: "Action",
        field: "action",
        width: 100,
      },
    ],

    rows: usersForRender,
  };

  return (
    <>
      <MDBDataTable striped bordered small data={data} />
      {/* <div id="dtBasicExample_filter" className="dataTables_filter"> */}
      {/* <label>
          Search:
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder=""
            aria-controls="dtBasicExample"
          />
        </label>
      </div> */}
      {/* <table
        id="dtBasicExample"
        className="table table-striped table-bordered table-sm"
        cellSpacing="0"
        width="100%"
      >
        <thead>
          <tr>
            <th className="th-sm">Name</th>
            <th className="th-sm">Email</th>
            <th className="th-sm">Role</th>
            <th className="th-sm">Active</th>
            <th className="th-sm">Operate</th>
          </tr>
        </thead>
        {
          <tbody>
            {allUsers.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.isActive}</td>
                  <td>
                    <button>button</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        }
      </table> */}
    </>
  );
}

export default Setting;
