import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonName } from "../action";
import buscar from "../componentes/image/buscar.png";

import styles from "../styles/search.module.css";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);

    console.log(name);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getPokemonName(name));
    setName("");
  }
  return (
    <div>
      <div className={styles.inputSearchFader}>
        <input
          className={styles.inputSearch}
          type="text"
          placeholder="Buscar un Pokemon..."
          onChange={handleInputChange}
        />
        <div>
          <img
            className={styles.imgSearch}
            type="submit"
            onClick={(e) => handleSubmit(e)}
            src={buscar}
            alt="search"
          />
        </div>
      </div>
    </div>
  );
}
