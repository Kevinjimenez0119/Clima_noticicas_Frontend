import { useState } from "react";
import { useEffect } from "react";
import "./styles/Noticia_clima.css";
import swal from "sweetalert";
import { getInfonoticia } from "./Servicios/Servicios";
import { getInfoclima } from "./Servicios/Servicios";
import { postCiudad } from "./Servicios/Servicios";
import { postNoticias } from "./Servicios/Servicios";
import { postClimas } from "./Servicios/Servicios";

export const Noticia_clima = () => {
  const [news, setNews] = useState([] as any[]);
  const [clima, setClima] = useState([] as any);
  const [ciudad, setCiudad] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCiudad(e.target.value);
    //console.log(ciudad);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let num: boolean;
    var valoresAceptados = /^[0-9]+$/;
    if (ciudad.match(valoresAceptados)) {
      num = true;
    } else {
      num = false;
    }
    if (ciudad === "" || ciudad.length > 20 || num === true) {
      swal("Por favor digite una ciudad");
    } else {
      setClima(await getInfoclima(ciudad));
      const pclima = await getInfoclima(ciudad);
      setNews(await getInfonoticia(ciudad));
      const pnews = await getInfonoticia(ciudad);

      const hoy = new Date();
      const fecha =
        hoy.getDate() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getFullYear();
      const hora =
        hoy.getHours() + ":" + hoy.getMinutes() + ":" + hoy.getSeconds();
      const fechayhora = fecha + " " + hora;

      const busqueda = {
        ciudad: ciudad,
        fecha: fechayhora,
      };

      const pciudad = await postCiudad(busqueda);

      for (let index = 0; index < pnews.length; index++) {
        const noticia = {
          autor: pnews[index].author,
          titulo: pnews[index].title,
          urlnoticia: pnews[index].url,
          idciudad: pciudad.idbusqueda,
        };

        //console.log(noticia);
        postNoticias(noticia);
      }

      const infoclima = {
        ciudad: pclima.name,
        temp: pclima.main?.temp,
        temp_max: pclima.main?.temp_max,
        temp_min: pclima.main?.temp_min,
        humedad: pclima.main?.humidity,
        idciudad: pciudad.idbusqueda,
      };
      //console.log(infoclima);
      if (!infoclima.ciudad === undefined) {
        postClimas(infoclima);
      }
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="seccion-buscarclima">
      <div className="barradebusqueda">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            id="name"
            className="search2"
            placeholder="Ciudad a buscar"
            onChange={handleInputChange}
          />
        </form>
      </div>

      <ul className="containerinfo">
        <aside className={clima.name === undefined ? "error404" : "climas"}>
          <div className="container-imgclima">
            <h2
              className={clima.name === undefined ? "error404" : "tituloclima"}
            >
              Clima
            </h2>
            <img
              src="https://images.squarespace-cdn.com/content/v1/5572b7b4e4b0a20071d407d4/1487090874274-FH2ZNWOTRU90UAF5TA2B/Weather+Targeting"
              alt="climaimg"
            />
          </div>
          <div className="seccion-stats">
          <div className="col1">
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Ciudad: {clima?.name}
            </p>
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Timezone: {clima.timezone}
            </p>
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Nubes: {clima.clouds?.all}
            </p>
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Temperatura °K: {clima.main?.temp}
            </p>
          </div>
          <div className="col2">
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Temperatura maxima °K: {clima.main?.temp_max}
            </p>
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Temperatura minima °K: {clima.main?.temp_min}
            </p>
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Presion: {clima.main?.pressure}
            </p>
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Humedad: {clima.main?.humidity}
            </p>
            <p className={clima.name === undefined ? "error404" : "clima"}>
              Pais/siglas: {clima.sys?.country}
            </p>
          </div>
          </div>
        </aside>

        <div className="seccion-noticias">
          <h1>Todas las noticias</h1>

          <div className="card-noticias">
            {news.map((noticia, index) => (
              <aside className="noticiali" key={index}>
                <p className="noticia">Autor: {noticia.author} </p>
                <a href={noticia.url} className="titulo">
                  {noticia.title}{" "}
                </a>
                <p className="noticia">{noticia.content} </p>
                <p className="noticia">Descripcion: {noticia.description} </p>
                <p className="noticia">Publicado: {noticia.publishedAt} </p>
                <img
                  src={noticia.urlToImage}
                  className="img"
                  alt="some value"
                ></img>
                <p className="noticia"> URL: {noticia.url}</p>
              </aside>
            ))}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Noticia_clima;
