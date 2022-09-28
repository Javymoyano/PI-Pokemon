import React from "react";
import { Link } from "react-router-dom";
import "../styles/landing.css";
//import image from "../componentes/image/poke-landing.png";

export default function Landing() {
  return (
    <div className="landing">
      <Link to="/home" style={{ color: "transparent" }}>
        <button className="button">¡Encuentra tu Pokémon!</button>
      </Link>
    </div>
  );
}
