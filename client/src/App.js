import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Landing from "./componentes/Landing";
import Home from "./componentes/Home";
import Details from "./componentes/Details";
import Form from "./componentes/Form";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route path="/home" component={Home} />
          <Route path="/create" component={Form} />
          <Route exact path="/pokemons/:id" component={Details} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
