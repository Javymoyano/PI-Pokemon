import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getTypesPokemons } from "../action";
import "../styles/form.css";

function validName(str) {
  if (typeof str !== "string") return true;
  if (str.length < 3) return true;
}

function validar(input) {
  let errors = {};
  if (validName(input.name)) errors.name = "Por favor introduzca un Nombre";
  if (!input.life) errors.life = "Por favor introduzca la vida del Pokemon";

  if (input.attack < 1 || input.attack >= 1000)
    errors.attack = "Debe ser mayor a 1 y menor a 1000";

  if (!input.defense)
    errors.defense = "Por favor introduzca el Poder de Defensa";
  if (!input.types) errors.types = "Debe seleccionar el Tipo";
  if (!input.speed) errors.speed = "Por favor introduzca la Velocidad";
  if (!input.height) errors.height = "Por favor introduzca la Altura";
  if (!input.weight) errors.weight = "Por favor introduzca el Peso";
  if (!input.image) errors.image = "Por favor introduzca url de la Imagen";

  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const types = useSelector((state) => state.types);

  const [input, setInput] = useState({
    name: "",
    types: [],
    image: "",
    life: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    dispatch(getTypesPokemons());
  }, []);

  const [errors, setErrors] = useState({});
  const [errorBoton, setErrorBoton] = useState(
    Object.values(errors).length > 0 ? true : false
  );

  function handleInputChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(validar(input));
  }
  console.log("SOY EL INPUT", input);

  function handleTypes(e) {
    setInput({
      ...input,
      types: [...new Set([...input.types, e.target.value])],
    });
  }
  console.log("Soy types", input);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors(validar(input));
    await axios.post("http://localhost:3001/create", input);
    setInput({
      name: "",
      types: [],
      image: "",
      life: "",
      attack: "",
      defense: "",
      speed: "",
      height: "",
      weight: "",
    });
    alert("Pokemon creado con éxito");

    console.log("Soy el submit", input);
  }

  return (
    <div className="container-form">
      <Link to="/home">
        <button className="atras">ATRÁS</button>
      </Link>
      <div className="title">
        <h1></h1>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          onChange={(e) => handleInputChange(e)}
          type="text"
          value={input.name}
          name="name"
          className="input"
        />
        {errors.name ? <p className="error">{errors.name}</p> : false}
        <div>
          <label>Vida</label>
          <input
            onChange={handleInputChange}
            type="number"
            value={input.life}
            name="life"
            className="input"
          />
          {errors.life ? <p className="error">{errors.life}</p> : false}
        </div>
        <div>
          <label>Fuerza</label>
          <input
            onChange={handleInputChange}
            type="number"
            value={input.attack}
            name="attack"
            className="input"
          />
          {errors.attack ? <p className="error">{errors.attack}</p> : false}
        </div>
        <div>
          <label>Defensa</label>
          <input
            onChange={handleInputChange}
            type="number"
            value={input.defense}
            name="defense"
            className="input"
          />
          {errors.defense ? <p className="error">{errors.defense}</p> : false}
        </div>
        <div>
          <label>Velocidad</label>
          <input
            onChange={handleInputChange}
            type="number"
            value={input.speed}
            name="speed"
            className="input"
          />
          {errors.speed ? <p className="error">{errors.speed}</p> : false}
        </div>
        <div>
          <label>Altura</label>
          <input
            onChange={handleInputChange}
            type="number"
            value={input.height}
            name="height"
            className="input"
          />
          {errors.height ? <p className="error">{errors.height}</p> : false}
        </div>
        <div>
          <label>Peso</label>
          <input
            onChange={handleInputChange}
            type="number"
            value={input.weight}
            name="weight"
            className="input"
          />
          {errors.weight ? <p className="error">{errors.weight}</p> : false}
        </div>
        <div>
          <label>Imagen</label>
          <input
            onChange={handleInputChange}
            type="text"
            placeholder="Introduzca URL de la Imagen..."
            value={input.image}
            name="image"
            className="input"
          />
          {errors.image ? <p className="error">{errors.image}</p> : false}
        </div>
        <div>
          <label>Tipos*</label>
          <select className="tipos" onChange={handleTypes}>
            {types.map((e) => (
              <option value={e.name}>{e.name}</option>
            ))}
          </select>
          <p className="elige-tipo">
            <small>*Elige hasta DOS tipos</small>
          </p>

          <ul>
            <li key={types.id}>
              {input.types.map((e) => e.toUpperCase()).join(" - ")}
            </li>
          </ul>
          {errors.types ? <p className="error">{errors.types}</p> : false}
        </div>

        <button className="bottom" type="submit" disabled={errorBoton}>
          Crear Pokemon
        </button>
      </form>
    </div>
  );
}
