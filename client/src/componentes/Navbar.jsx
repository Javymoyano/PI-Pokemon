import React from "react";
import Searchbar from "./Searchbar";
import { Link } from "react-router-dom";
import logo from "../componentes/image/logo.png";
import "../styles/navbar.css";
import Crear from "../componentes/image/mas.png";

export default function Navbar() {
  return (
    <div className="nav-container">
      <div>
        <img className="logo" src={logo} alt="logo" />
      </div>
      <div>
        <h1 className="encuentra">Encuentra tu Pokémon</h1>
      </div>

      <div className="ambos">
        <div>
          <Searchbar />
        </div>
        <div>
          <Link to="/create">
            <img
              className="crearPokemon"
              src={Crear}
              alt="crear"
              title="Crear nuevo Pokemon"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
