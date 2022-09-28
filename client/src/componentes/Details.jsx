import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getClean, pokemonDetails } from "../action";
import Loading from "../componentes/image/loading.png";
import "../styles/details.css";

export default function Details(props) {
  const dispatch = useDispatch();
  const id = props.match.params.id;
  useEffect(() => {
    dispatch(pokemonDetails(id));
    return () => {
      dispatch(getClean());
    };
  }, [dispatch, id]);

  const myPokemon = useSelector((state) => state.details);
  console.log(myPokemon);
  return (
    <div>
      {myPokemon.length > 0 ? (
        <div className="contenedor-detail">
          <div className="all">
            <h1 className="nombre-poke">{myPokemon[0].name.toUpperCase()}</h1>
            <p className="id-poke">#{myPokemon[0].id}</p>
            <img
              className="img-poke"
              src={myPokemon[0].image}
              alt="img not found"
            />
            <div className="contenedor-tipos">
              <h4 className="tiposPoke">
                {myPokemon[0].types[0]
                  ? myPokemon[0].types[0].charAt(0).toUpperCase() +
                    myPokemon[0].types[0].slice(1)
                  : myPokemon[0].types[0]}
              </h4>
              <h4 className="tiposPoke">
                {myPokemon[0].types[1]
                  ? myPokemon[0].types[1].charAt(0).toUpperCase() +
                    myPokemon[0].types[1].slice(1)
                  : null}
              </h4>
            </div>
          </div>

          <div className="estadisticas">
            <div className="column1">
              <h4>Vida </h4>
              <h5>{myPokemon[0].hp} Ps</h5>
              <h4>Fuerza</h4>
              <h5>{myPokemon[0].attack} %</h5>
              <h4>Defensa</h4>
              <h5>{myPokemon[0].defense} %</h5>
            </div>
            <div className="column2">
              <h4>Velocidad</h4>
              <h5>{myPokemon[0].speed} %</h5>
              <h4>Altura</h4>
              <h5>{myPokemon[0].height} Mt</h5>
              <h4>Peso</h4>
              <h5> {myPokemon[0].weight} Kg</h5>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <img className="loading" src={Loading} alt="loading" />
        </div>
      )}
      <div>
        <Link to="/home">
          <button className="btn-loading">Volver a Home</button>
        </Link>
      </div>
    </div>
  );
}
