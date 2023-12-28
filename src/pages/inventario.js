import React, {useState, useEffect, useMemo, useRef} from 'react';
import InventarioForm from './inventario-form';

import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';

import { API_URL } from "../utils/consts/api";
import http from "../utils/config/http";
import { format, isValid } from 'date-fns'

import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

import { MenuItem, Button, Box} from '@mui/material';
import Swal from 'sweetalert2'

const Inventario = (props) => {

  const [data, setData] = useState([]);  
  const tableInstanceRef = useRef(null);
  const [currentInventario, setCurrentInventario] = useState({});    
  const [recallInventario, setRecallInventario] = useState([]);    

  const [dateRange, setDateRange] = useState(["", ""]);  
  const [rowSelection, setRowSelection] = useState({});
  const [rowCount, setRowCount] = useState(0);
  
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [anySelected, setAnySelected] = useState(true);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

   const [currentDate, setCurrentDate] = useState("");
   const [calendarVisible, setCalendarVisible] = useState(false);
  const [rangeDate, setRangeDate] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  const [openModal, setOpenModal] = useState(false);

  useMemo(() => {    
  }, []);
  
  useEffect(() => {
    let any=true;
    Object.keys(rowSelection).forEach(key => {       
      any=false;
    });  
    setAnySelected(any);
  }, [rowSelection]);
  
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        muiTableHeadCellProps: { },
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },
      {
        accessorKey: 'nombre',
        header: 'nombre',
        id: 'nombre',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'oficina',
        header: 'oficina',
        id: 'oficina',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'correo',
        header: 'correo',
        id: 'correo',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'bodega',
        header: 'bodega',
        id: 'bodega',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      },{
        accessorKey: 'telefono',
        header: 'telefono',
        id: 'telefono',
        Cell: ({ cell }) => <span>{cell.getValue()}</span>,
      }
    ],
    [],
  );

  useEffect(() => {              
    
    let data={
      id: "",
      nombre: "",
      telefono: "",
      telefonoMovil: "",            
      correo: "",            
      bodega: 0,            
      oficina: 0,            
    }         
    
    if(sorting && sorting[0]){
      data.sorting=sorting[0];
    }

    columnFilters.map((it)=>{
      data[it.id]=it.value;
    });     
    
    data.globalFilter=globalFilter?globalFilter:"";            
    
    console.log(data);      
    http.get(`${API_URL}/inventario`).then((result) => {        
      console.log(result);      
      setData(result.data);           
      setRowCount(result.data.length);            
    }).catch((err) =>
      console.log(err)
    ).finally(() =>
      console.log()
    )    
  }, [
    dateRange,
    columnFilters,
    globalFilter,
    pagination.pageIndex,
    pagination.pageSize,
    sorting,

    recallInventario
  ]);


  const create= () => {    
    setCurrentInventario({
      nombre: "",
      telefono: "",
      telefonoMovil: "",
      correo: "",
      bodega: 0,
      oficina: 0    
    });
    setOpenModal(true);    
  }
  const editInventario= (inventario) => {        
    delete inventario.original.createAt;
    delete inventario.original.updateAt;
    setCurrentInventario(inventario.original);
    setOpenModal(true);
    document.querySelector(".MuiBackdrop-root").click();
  }
  

  const closeModal = () => {
    setOpenModal(false);
  }
  const saveModal = (inventario) => {    
    if(inventario.id){
      console.log(inventario);      
      http.put(`${API_URL}/inventario`, inventario).then((result) => {          
        if(result.status==200){
          setOpenModal(false);
          Swal.fire('El Libro ha sido Actualizado!', '', 'success');
          setRecallInventario(!recallInventario);
        }else{
          Swal.fire('Ha ocurrido un error, intenta nuevamente!', '', 'error')
        }
      }).catch((err) =>
      console.log(err)
      ).finally(() =>
      console.log()
      )
    }else{
      console.log(inventario);      
      http.post(`${API_URL}/inventario`, inventario).then((result) => { 
        console.log(result);                 
        if(result.data && result.data.id){
          setOpenModal(false);
          Swal.fire('El Libro ha sido creado!', '', 'success');
          setRecallInventario(!recallInventario);
        }else{
          Swal.fire('Ha ocurrido un error, intenta nuevamente!', '', 'error')
        }
      }).catch((err) =>{
        console.log(err);                        
      })
    }
  }   
  
  return (
    <>
      <article className="inventarios">
        <header>
          <h1>Inventario</h1>                    
        </header>        
          <section>
            <MaterialReactTable
            columns={columns}
            data={data}
            enableColumnOrdering            
            onRowSelectionChange={setRowSelection}         
            
            enablePagination={false}
            manualFiltering={false}
            manualPagination={false}
            manualSorting={false}
            onColumnFiltersChange={setColumnFilters}
            onGlobalFilterChange={setGlobalFilter}
            onPaginationChange={setPagination}
            onSortingChange={setSorting}
            rowCount={rowCount}
            state={
              {
                showColumnFilters: true,
                rowSelection,
                columnFilters,
                globalFilter,                
                pagination,                                
                sorting,
              }
            }    
            
                    
            enableGlobalFilter= {false}
            muiTableBodyRowProps={({ row }) => ({
              onClick: row.getToggleSelectedHandler(),
              sx: { cursor: 'pointer' },
            })}
                 
            enableRowActions={true}
            positionActionsColumn={'last'}
            renderRowActionMenuItems={({ row }) => [
              <MenuItem key="editar" onClick={() => editInventario(row)}>
                Editar
              </MenuItem>              
            ]}

            renderTopToolbarCustomActions={({ table }) => (
              <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                <Button
                  color="primary"
                  onClick={create}
                  variant="contained"
                >
                  Crear Item
                </Button>                
              </Box>
            )}
            localization={MRT_Localization_ES}
            />            
          </section>      
      </article>

      {!!openModal && (
          <InventarioForm closeModal={closeModal} inventario={currentInventario} save={saveModal} />
      )}

    </>
);
}

export default Inventario;
