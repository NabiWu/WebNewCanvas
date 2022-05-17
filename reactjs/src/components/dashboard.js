import { useEffect, useState } from "react";
import AuthUser from "./AuthUser";

export default function Dashboard() {
  const { http} = AuthUser();
  const [userdetail, setUserdetail] = useState('');

  useEffect (()=> {
    fetchUserDetail();

  }, []);

  const fetchUserDetail = () => {
    http.get('/me').then((res)=>{
      setUserdetail(res.data);
    })

  }

  function renderElement(){
      if(userdetail){
    return (
      <div>
        <h4>Name</h4>
        <p>{userdetail.name}</p>
        <h4>Email</h4>
        <p>{userdetail.email}</p>
        <h4>Role</h4>
        <p>{userdetail.role}</p>
      </div>
    );
  }else{
    return <p>Loading......</p>
  }

  }



  return (
    <div>
      {renderElement()}
    </div>
  );
}
