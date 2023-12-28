import React, { useMemo } from 'react';
import http from "../../utils/config/http";
import { API_URL } from "../../utils/consts/api";
import { useUserToggleContext} from "../../UserProvider";
import { useNavigate} from 'react-router-dom';

const Logout = (props) => {    

  const {logout} = useUserToggleContext();
  const navigate = useNavigate();
  
  useMemo(() => {
    http.post(`${API_URL}/logout`).then((result) => {
      logout();    
      navigate("/");                              
    }).catch((err) =>
      console.log(err)
    ).finally(() =>
      console.log()
    )  
  }, []);
  
  return (
    <></>
);
}

export default Logout;
