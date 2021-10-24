import axios from 'axios';
import swal from 'sweetalert';

//Obtengo la info del clima, si no es ciudad devuelvo un alert que no es ciudad
//Si no es ciudad no muestro clima pero si noticias que haya relacionadas
export const getInfoclima=( query: String ) => {

    const clima = axios.get(`http://34.199.225.252/api/Endpoes?ciudad=${query}`)
    .then(res => {

      const clima = res.data;
      //console.log(clima);
      
     if(clima==="No es una ciudad")
     {
      swal(query + " no es una ciudad");

     }
     return clima;
     }).catch(error => {
      
      
      console.log(error.response.data.error)

   })
   return clima;
  }

//Guardo la busqueda 
export const postCiudad=(busqueda: any) => {

    const post = axios.post(`http://34.199.225.252/api/busquedas`, busqueda)
        .then(res => {
          //console.log(res);
          //console.log(res.data);
          return res.data;
        }).catch(error => {
          
          console.log(error.response.data.error)
          
       })
       return post;
  }

//Guardo la data de noticias
export const postNoticias=(busqueda: any) => {

    const post = axios.post(`http://34.199.225.252/api/noticias`, busqueda)
        .then(res => {
          //console.log(res);
          //console.log(res.data);
          return res.data;
        }).catch(error => {
          
          console.log(error.response.data.error)
          
       })
       return post;
  }

//Guardo la data de clima
export const postClimas=(busqueda: any) => {

    const post = axios.post(`http://34.199.225.252/api/climas`, busqueda)
        .then(res => {
          //console.log(res);
          //console.log(res.data);
          return res.data;
        }).catch(error => {
          
          console.log(error.response.data.error)
          
       })
       return post;
  }
  

//Obtengo la info de las noticias por ciudad o por una palabra clave
export const getInfonoticia=( query: String ) => {
    
    const noticias = axios.get(`http://34.199.225.252/api/Endpoes?query=${query}`)
     .then(res => {
       const news = res.data;
       //console.log(news);
       return news;
     }).catch(error => {
       
       console.log(error.response.data.error)
    })
    return noticias;
  }

//Obtego las busquedas mas recientes
export const getBusquedas=() => {
  
  const busquedas = axios.get(`http://34.199.225.252/api/busquedas`)
  .then(res => {
    const busquedas = res.data;
    
    console.log(busquedas);
    return busquedas;
  }).catch(error => {
      
      
    console.log(error.response.data.error)

 })
 return busquedas;
  
}