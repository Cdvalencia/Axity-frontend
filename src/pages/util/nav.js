import React, {useState, useEffect, useMemo} from 'react';
import { Link, useLocation, useNavigate} from 'react-router-dom';
import { useUserContext } from "../../UserProvider";

const Nav = (props) => {
 
  const user = useUserContext();
  const [nav, setNav] = useState(props);  
  const location = useLocation();
  const path = location.pathname;
  useMemo(() => {
    // dispatch(getDesigns(1,2));
  }, []);

  useEffect(() => {
    setNav(props);
    // setEditorHtml(props.editor)
  },[props.name]);

  function changeInput(e){
    setNav({
      ...nav,
      [e.target.name]: e.target.value
    });
  }


  return (
    <>
    {
      (user || true) && 
      <nav>
        <h3>{user.email}</h3>
        <ul>        
          <li className={(path=="/home")?"active":""}>
            <Link to={"/home"}>
              Home
            </Link>
          </li>
          <li className={(path=="/inventario")?"active":""}>
            <Link to={"/inventario"}>
              Inventario
            </Link>
          </li>        
            <li>
                <Link to={"/logout"}>
                  Cerrar Sesión
                </Link>
            </li>              
        </ul>
      </nav>
    }
  </>    
  )
}
export default Nav;
