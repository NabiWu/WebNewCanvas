import "bootstrap/dist/css/bootstrap.min.css";
import AuthUser from "./components/AuthUser";
import Guest from "./navbar/guest";
import Auth from "./navbar/auth";

function App() {
  const { getToken, getRole } = AuthUser();
  
  if (!getToken()) {
    return <Guest />;
  } else {
    const userRole = getRole();
    if (userRole === "student") {
      return <Auth />;
    } else if (userRole === "teacher") {
      return <Auth />;
    } else if (userRole === "admin") {
      return <Auth />;
    }
  }

  // return <Auth />;
}

export default App;
