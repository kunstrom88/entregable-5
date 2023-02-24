import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PokeCard from "../components/Pokedex/PokeCard";
import Pagination from "../components/Pokedex/Pagination";
import pokedex from "../components/Pokedex/styles/pokedex.css";
const Pokedex = () => {
  const { trainer } = useSelector((state) => state);

  const [pokemons, setPokemons] = useState();
  const [types, setTypes] = useState();
  const [typeSelected, setTypeSelected] = useState("All pokemons");

  const navigate = useNavigate();

  useEffect(() => {
    if (typeSelected !== "All pokemons") {
      axios
        .get(typeSelected)
        .then((res) => setPokemons(res.data.pokemon.map((e) => e.pokemon)))
        .catch((err) => console.log(err));
    } else {
      const URL = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000000`;
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [typeSelected]);

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/type`;
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.error(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    navigate(`/pokedex/${input}`);
  };

  const handleChange = (e) => {
    setTypeSelected(e.target.value);
    setPage(1);
  };

  const [page, setPage] = useState(1);
  const [pokePerPage, setpokePerPage] = useState(9);
  const initialPoke = (page - 1) * pokePerPage;
  const finalPoke = page * pokePerPage;
  const maxPage = pokemons && Math.ceil(pokemons.length / pokePerPage);
  return (
    <div className="poke-div">
      <h3 className="poke__title">
        Welcome <span className="poke__span"> {trainer} </span> , here you can
        find your favorite pokemon.
      </h3>
      <form className="poke__form" onSubmit={handleSubmit}>
        <section className="poke__section">
          <input
            className="poke__input"
            id="search"
            type="text"
            placeholder="search your pokemon"
          />
          <button className="poke__button">Search</button>
        </section>
        <select className="poke__select" onChange={handleChange}>
          <option value="All pokemons">All pokemons</option>
          {types?.map((type) => (
            <option key={type.url} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </form>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
      <div className="poke-container">
        {pokemons?.slice(initialPoke, finalPoke).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};

export default Pokedex;
