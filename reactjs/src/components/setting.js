import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";
import { MDBDataTable } from "mdbreact";
import { ScrollMenu} from "react-horizontal-scrolling-menu";

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
    <ScrollMenu>
      <MDBDataTable striped bordered small data={data} />
    </ScrollMenu>
      
    </>
  );
}

export default Setting;
