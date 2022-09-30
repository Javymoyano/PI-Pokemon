import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  filterAlphbetical,
  filterByAttack,
  filterByTypes,
  filterByCreated,
} from "../action";
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado";
import Searchbar from "./Searchbar";
import "../styles/home.css";
import Navbar from "./Navbar";
import Refresh from "../componentes/image/refresh.png";

export default function Home() {
  const dispatch = useDispatch();

  const [order, setOrder] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const allPokemons = useSelector((state) => state.pokemons);
  const [currentPage, setCurrentPage] = useState(1); //tengo un estado con la pagina actual y uno q me setee la pag.actual
  const [pokemonPerPage, setPokemonPerPage] = useState(12); // persosnajes por pagina
  const indexOfLastPokemon = currentPage * pokemonPerPage; // es el ultimo personaje por pagina, en este caso es 11
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage; // 0
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  ); // que haga un corte entre el indice del primer pokemon y el indice del ultimo

  if (
    currentPage > Math.ceil(allPokemons.length / pokemonPerPage) &&
    currentPage !== 1
  ) {
    setCurrentPage(1);
  }

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
    setCurrentPage(1);
  }

  function handleSortAz(e) {
    e.preventDefault();
    dispatch(filterAlphbetical(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleAttack(e) {
    e.preventDefault();
    dispatch(filterByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleTypes(e) {
    e.preventDefault();
    dispatch(filterByTypes(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleCreated(e) {
    e.preventDefault();
    dispatch(filterByCreated(e.target.value));
    setOrder(`Ordenado ${e.target.value}`);
    setCurrentPage(1);
  }

  return (
    <div>
      <div className="home-cont">
        <Navbar />
        {/* <Link to="/create">
        <button>Crear Pokemon</button>
      </Link> */}
        {/* <h1>Encuentra tu Pokémon</h1> */}
        {/* <button
          onClick={(e) => {
            handleClick(e);
          }}
        >
          Volver a cargar todos los Pokemons
        </button> */}
        <div className="filter">
          <div className="filtered" value="filtered">
            <div
              onClick={(e) => {
                handleClick(e);
              }}
            >
              <img
                className="refresh"
                src={Refresh}
                alt="refresh"
                title="Cargar todos los Pokémons"
              />
            </div>
            <select onChange={(e) => handleSortAz(e)}>
              <option value="all">ORDEN ALFABÉTICO</option>
              <option value="az">A - Z</option>
              <option value="za">Z - A</option>
            </select>
            <select onChange={(e) => handleAttack(e)}>
              <option value="Fuerza">FUERZA DE ATAQUE</option>
              <option value="asc">Mayor Fuerza</option>
              <option value="desc">Menor Fuerza</option>
            </select>

            <select onChange={(e) => handleTypes(e)}>
              <option value="type">TIPO</option>
              <option value="normal"> Normal </option>
              <option value="flying"> Flying </option>
              <option value="poison"> Poison </option>
              <option value="ground"> Ground </option>
              <option value="bug"> Bug </option>
              <option value="fire"> Fire </option>
              <option value="water"> Water </option>
              <option value="grass"> Grass </option>
              <option value="electric"> Electric </option>
              <option value="fairy"> Fairy </option>
            </select>
            <select onChange={(e) => handleCreated(e)}>
              <option value="all"> TODOS </option>
              <option value="creados"> Creados </option>
              <option value="existentes"> Existentes </option>
            </select>
          </div>
        </div>

        {/* <div>
          <Searchbar />
        </div> */}
        <div>
          <div>
            <Paginado
              pokemonPerPage={pokemonPerPage}
              allPokemons={allPokemons.length} // porque necesito un valor numerico
              paginado={paginado}
            />
          </div>

          <div>
            {currentPokemons?.map((e) => {
              return (
                <>
                  <Link to={"/pokemons/" + e.id}>
                    <Card
                      image={e.image}
                      name={e.name}
                      attack={e.attack}
                      types={e.types}
                    />
                  </Link>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
