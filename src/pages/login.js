import React from 'react';
import http from "../utils/config/http";
import { API_URL } from "../utils/consts/api";
import { useUserToggleContext} from "../UserProvider";
import { useNavigate} from 'react-router-dom';

const Login = (props) => {    

  const {saveUser} = useUserToggleContext();
  const navigate = useNavigate();

  function login(user){
    navigate("/home");                              
    // http.post(`${API_URL}/login`,{
    //     "email": user,
    //     "password": "user123"    
    // }).then((result) => {
    //   console.log(result);              
    //   http.post(`${API_URL}/user`,result.data).then((result) => {
    //     console.log(result);   
    //     saveUser(result.data);
    //   }).catch((err) =>
    //     console.log(err)
    //   ).finally(() =>
    //     console.log()
    //   )
    // }).catch((err) =>
    //   console.log(err)
    // ).finally(() =>
    //   console.log()
    // )
  }  
  return (
    <section className="login">
      <h1>Sistema de inventarios</h1>
      <section>
        <h2 onClick={()=>{login("user1")}}>Iniciar como User 1</h2>      
        <h2 onClick={()=>{login("user2")}}>Iniciar como User 2</h2>      
        <h2 onClick={()=>{login("user3")}}>Iniciar como User 3</h2>              
      </section>
    </section>
);
}

export default Login;
