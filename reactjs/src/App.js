import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from "./components/AuthUser";
import Guest from "./navbar/guest";
import  Admin from "./navbar/admin";
import Student from "./navbar/student";
import Teacher from "./navbar/teacher";

function App() {
  const { getToken, getRole } = AuthUser();
  
  if (!getToken()) {
    return <Guest />;
  } else {
    const userRole = getRole();
    if (userRole === "student") {
      return <Student />;
    } else if (userRole === "teacher") {
      return <Teacher />;
    } else if (userRole === "admin") {
      return <Admin />;
    }
  }

  // return <Auth />;
}

export default App;
