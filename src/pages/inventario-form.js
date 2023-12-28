import React, {useState, useEffect, useMemo, useRef} from 'react';
import { Modal } from './util/modal';
import Swal from 'sweetalert2'
import { format, isValid} from 'date-fns'

import { Calendar } from 'react-date-range';

const InventarioForm = (props) => {

    // const dispatch = useDispatch();
    const [inventario, setInventario] = useState(props.inventario);        
    const [validationInventario, setValidationInventario] = useState({});  
    const [title, setTitle] = useState((!(props.inventario.title))?"Crear Item":"Editando Item - "+props.inventario.title);   
    const [bodegas, setBodegas] = useState(["Medellín", "Calí"]);   
    
    const [oficinas, setOficinas] = useState([]);   
    
    const [date, setDate] = useState(null);     
    const [calendarVisible, setCalendarVisible] = useState(false);

    useMemo(() => {      
        let validation={}
        console.log(props.inventario);        
        Object.keys(props.inventario).forEach(key => validation[key] = {
            dirty: false,
            touched: false
        });     
        if(props.inventario && props.inventario.bodega =="Medellín"){
            let oficinas=[];
            oficinas.push("M3390");
            oficinas.push("M1425");
            setOficinas(oficinas);
        }
        if(props.inventario && props.inventario.bodega =="Calí"){
            let oficinas=[];
            oficinas.push("C4490");
            oficinas.push("C1222");
            setOficinas(oficinas);
        }   
        setValidationInventario(validation);                                
    }, []);
    
    
    const save = () => { 
        let valid=true;
        let validationInventario2={};
        Object.keys(inventario).forEach(key => {
            if(inventario[key]==""){
                valid =false; 
                validationInventario2[key]={
                    dirty: true,
                    touched: false
                }                                               
            }
        });

        validationInventario2.bodega={
            dirty: true,
            touched: false
        }   
        validationInventario2.oficina={
            dirty: true,
            touched: false
        }   

        if(inventario.telefono.length!=7){
            valid=false;
        }
        
        if(inventario.telefonoMovil.length!=10 || inventario.telefonoMovil.substring(0,1)!="3"){
            valid=false;
        }

        if(!validarCorreo(inventario.correo)){
            valid=false;
        }

        setValidationInventario({
            ...validationInventario,
            ...validationInventario2
        });   
        console.log(inventario);        
                              
        if(valid){
            props.save(inventario);
        }else{
            Swal.fire('Todos los campos no están completos y válidos.', '', 'warning');
        }
    }  

  function ChangeBodega(e){         
    if(e.target.value=="Medellín"){
        let oficinas=[];
        oficinas.push("M3390");
        oficinas.push("M1425");
        setOficinas(oficinas);
    }
    if(e.target.value=="Calí"){
        let oficinas=[];
        oficinas.push("C4490");
        oficinas.push("C1222");
        setOficinas(oficinas);
    }
    setInventario({
      ...inventario,
      bodega: e.target.value
    });    
  }  

  function ChangeOficina(e){                 
    setInventario({
      ...inventario,
      oficina: e.target.value
    });   
  }

  function validarCorreo(correo) {    
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
  }

  function changeInput(e){
    console.log(e.target.name);    
    setInventario({
      ...inventario,
      [e.target.name]: e.target.value
    });
    setValidationInventario({
      ...validationInventario,
      [e.target.name]: {
        dirty: true
      }
    });
  }
 
  return (
    <>
        <Modal closeModal={props.closeModal} titleModal={props.titleModal} save={ ev => save() }>
        <>          
            <header>              
            <h2>{title}</h2>
            <div onClick={props.closeModal}>
                <figure>
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.6487 10L19.9397 0.401841C20.0787 0.242331 19.9618 0 19.7471 0H17.2266C17.0782 0 16.936 0.0644171 16.8381 0.174847L10 8.09202L3.16189 0.174847C3.06714 0.0644171 2.92501 0 2.7734 0H0.252932C0.038155 0 -0.078709 0.242331 0.0602641 0.401841L8.35127 10L0.0602641 19.5982C0.0291329 19.6337 0.00916097 19.6772 0.00271883 19.7234C-0.00372332 19.7697 0.00363488 19.8168 0.0239206 19.8591C0.0442063 19.9014 0.0765674 19.9372 0.117161 19.9621C0.157755 19.9871 0.204876 20.0003 0.252932 20H2.7734C2.92185 20 3.06398 19.9356 3.16189 19.8251L10 11.908L16.8381 19.8251C16.9329 19.9356 17.075 20 17.2266 20H19.7471C19.9618 20 20.0787 19.7577 19.9397 19.5982L11.6487 10Z"/>
                </svg>
                </figure>
            </div>
            </header>          
            <article className="modal-inventario">
            <form action="">
                <div>                  
                    <div>
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" value={inventario.nombre} placeholder="Nombre" onChange={changeInput} />
                        {validationInventario.nombre && validationInventario.nombre.dirty && inventario.nombre=="" && <span>El Nombre es requerido</span>}
                    </div>
                    <div>
                        <label htmlFor="telefono">Teléfono</label>
                        <input type="number" name="telefono" value={inventario.telefono} placeholder="Teléfono" onChange={changeInput} />
                        {validationInventario.telefono && validationInventario.telefono.dirty && inventario.telefono=="" && <span>El telefono es requerido</span>}
                        {validationInventario.telefono && validationInventario.telefono.dirty && (inventario.telefono.length!=7) && <span>El telefono debe tener 7 números</span>}
                    </div>
                </div>
                <div>
                    <div>                        
                        <label htmlFor="telefonoMovil">Teléfono Movil</label>
                        <input type="number" name="telefonoMovil" value={inventario.telefonoMovil} placeholder="Teléfono Movil" onChange={changeInput} />
                        {validationInventario.telefonoMovil && validationInventario.telefonoMovil.dirty && inventario.telefonoMovil=="" && <span>El telefono Movil es requerido</span>}
                        {validationInventario.telefonoMovil && validationInventario.telefonoMovil.dirty && (inventario.telefonoMovil.length!=10 || inventario.telefonoMovil.substring(0,1)!="3") && <span>El telefono Movil debe tener 10 números e iniciar con el número "3"</span>}
                    </div>
                    <div>
                        <label htmlFor="correo">Correo</label>
                        <input type="text" name="correo" value={inventario.correo} placeholder="correo" onChange={changeInput} />
                        {validationInventario.correo && validationInventario.correo.dirty && inventario.correo=="" && <span>El correo es requerido</span>}
                        {validationInventario.correo && validationInventario.correo.dirty && !validarCorreo(inventario.correo) && <span>El formato del correo no es requerido</span>}
                    </div>
                </div>
                
                <div>
                    <div>
                        <label htmlFor="bodega">Bodega</label>
                        <select value={inventario.bodega} onChange={ChangeBodega}>
                            <option value="0" disabled >-- Selecciona --</option>                                         
                            {
                                bodegas.map((it, i)=>{
                                return(
                                    <option key={i} value={it}>{it}</option>   
                                    )   
                                })
                            }
                                            
                        </select>
                        {validationInventario.bodega && validationInventario.bodega.dirty && inventario.bodega==0 && <span>La bodega es requerida</span>}
                    </div>
                    <div>
                        <label htmlFor="oficina">Oficina</label>
                        <select  value={inventario.oficina} onChange={ChangeOficina}>
                            <option value="0" disabled >-- Selecciona --</option>                                         
                            {
                                oficinas.map((it, i)=>{
                                return(
                                    <option key={i} value={it}>{it}</option>   
                                    )   
                                })
                            }
                                            
                        </select>
                        {validationInventario.oficina && validationInventario.oficina.dirty && inventario.oficina==0 && <span>La oficina es requerida</span>}
                    </div>
                </div>
                        
            </form>  
            </article>
            <footer>  
            <button className="btn btn1" onClick={save}>Guardar</button>                      
            <button className="btn btn2" onClick={props.closeModal}>Cancelar</button>                      
            </footer>
        </>
        </Modal>
    </>    
);
}

export default InventarioForm;
