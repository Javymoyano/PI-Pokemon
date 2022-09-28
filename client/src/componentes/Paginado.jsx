import React from "react";
import "../styles/paginado.css";

export default function Paginado({ pokemonPerPage, allPokemons, paginado }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allPokemons / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    //redneriza todos los numeros de pagina
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => {
            return (
              <li className="number">
                <button className="btn" onClick={() => paginado(number)}>
                  {number}
                </button>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
