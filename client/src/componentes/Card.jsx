import React from "react";
import "../styles/card.css";

export default function Card({ name, types, image, attack, onClose, id }) {
  return (
    <div className="stylesCard">
      <div className="fondo_img">
        <img
          src={image}
          alt="imagen"
          className="img"
          width="120px"
          height="120px"
        />
      </div>

      <div>
        <h2 className="name">{name.toUpperCase()}</h2>
      </div>

      <div>
        <br />
        <br />
        <h2 className="attack">ATAQUE</h2>
        <h2 className="force">{attack}</h2>
      </div>
      <div>
        <h4 className="tipo">TIPO</h4>
        <h4 className="tipos_list">
          {typeof types[0] === "string" &&
            types[0].charAt(0).toUpperCase() + types[0].slice(1)}
          {typeof types[1] === "string" &&
            " · " + types[1].charAt(0).toUpperCase() + types[1].slice(1)}
        </h4>
      </div>
    </div>
  );
}
