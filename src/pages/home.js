import React, { useMemo } from 'react';

import http from "../utils/config/http";
import { API_URL } from "../utils/consts/api";
import namor from 'namor'
import Swal from 'sweetalert2'

const Home = (props) => {

  useMemo(() => {    
  }, []);
    
  const ejecutar = (n) => {
    http.get(`${API_URL}/n`+n).then((result) => {        
      console.log(result);            
      Swal.fire(JSON.stringify(result.data), '', 'success');        
    }).catch((err) =>
      console.log(err)
    ).finally(() =>
      console.log()
    )        
  }



  return (
    <>
      <article className="home">
        <header>
          <h1>Bienvenido</h1>          
        </header>
        <section>        
          <div>
            <button className="btn btn1" onClick={()=>{ejecutar(1)}}>Numeral 1</button>
          </div>                    
          <div>
            <button className="btn btn1" onClick={()=>{ejecutar(2)}}>Numeral 2</button>
          </div>                    
          <div>
            <button className="btn btn1" onClick={()=>{ejecutar(3)}}>Numeral 3</button>
          </div>                    
          <div>
            <button className="btn btn1" onClick={()=>{ejecutar(4)}}>Numeral 4</button>
          </div>                    
          <div>
            <button className="btn btn1" onClick={()=>{ejecutar(5)}}>Numeral 5</button>
          </div>                    
          <div>
            <button className="btn btn1" onClick={()=>{ejecutar(6)}}>Numeral 6</button>
          </div>                                                
        </section>        
      </article>

    </>
);
}

export default Home;