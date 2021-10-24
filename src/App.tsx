
import './App.css';
import {Noticia_clima} from './Componets/Noticia_clima';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Busquedas_recientes} from './Componets/Busquedas_recientes'
import NavBar from './Componets/NavBar';

function App() {
  return (
    <>
    <Router>
      <NavBar />

      <div className="pages ">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
        <Switch>
          
          <Route exact path="/NoticiasClima" component={Noticia_clima} />
          <Route path="/Busquedas" component={Busquedas_recientes} />
          
        </Switch>
      </div>
    </Router>
  </>
  );
}

export default App;
