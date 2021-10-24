
import { useState } from 'react';
import { useEffect } from 'react';
import "./styles/Noticia_clima.css";
import {getBusquedas} from './Servicios/Servicios'

export const Busquedas_recientes=() => {
  
  const [busquedas, setBusquedas] = useState([]as any[]);
  
useEffect (() => {
  async function getB() {
    setBusquedas(await getBusquedas());
  }
    getB();
}, [])

return (
<div>  
  <table >
    <thead>
      <tr>

        <th scope="col">Busquedas Recientes</th>
        <th scope="col">Fecha y hora</th>
      
      </tr>
    </thead>
    <tbody>
           
      {busquedas.map((busqueda, index) => 
      <tr key={index}> 
      <th scope="row" className="filas">{busqueda.ciudad} </th>
      <th scope="row" className="filas">{busqueda.fecha} </th>
      </tr> )}

    </tbody>
  </table>
</div>  
    )
  
}
export default Busquedas_recientes;