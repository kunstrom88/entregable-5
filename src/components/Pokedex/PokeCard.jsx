import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles/pokeCard.css";

const PokeCard = ({ url }) => {
  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    axios
      .get(url)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/pokedex/${pokemon.id}`);
  };
  return (
    <article
      className={`poke-card border-${pokemon?.types[0].type.name}`}
      onClick={handleClick}
    >
      <header className={`poke-card__header bg-${pokemon?.types[0].type.name}`}>
        <img
          className="poke-card__sprite"
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />
      </header>
      <section className="poke-card__body">
        <h3 className={`poke-card__name color-${pokemon?.types[0].type.name}`}>
          {pokemon?.name}
        </h3>
        <ul className="poke-card__types-container">
          {pokemon?.types.map((type) => (
            <li className="poke-card__type" key={type.type.name}>
              {type.type.name}
            </li>
          ))}
        </ul>
        <h6 className="poke-card__info">Type</h6>
        <hr />
      </section>
      <footer className="poke-card__footer">
        <ul className="poke-card__stats-container">
          {pokemon?.stats.map((stat) => (
            <li className="poke-card__stat" key={stat.stat.name}>
              <span className="poke-card__label">{stat.stat.name}</span>
              <span
                className={`poke-card__number color-${pokemon?.types[0].type.name}`}
              >
                {stat.base_stat}
              </span>
            </li>
          ))}
        </ul>
      </footer>
    </article>
  );
};

export default PokeCard;
