import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/pokedexInfo.css";

const PokedexInfo = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState();

  const getPercentBar = (stat) => {
    const percent = (stat * 100) / 255;
    return `${percent}%`;
  };

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <main className="pokemon__main">
      <section
        className={`pokemon__header border-${pokemon?.types[0].type.name}`}
      >
        <section
          className={`pokemon__header bg-${pokemon?.types[0].type.name}`}
        >
          <div className="pokemon__header-img">
            <img
              className="pokemon__img"
              src={pokemon?.sprites.other["official-artwork"].front_default}
              alt=""
            />
          </div>
        </section>
      </section>

      <section className={`pokemon__body color-${pokemon?.types[0].type.name}`}>
        <h2 className={`pokemon__body-id #${pokemon?.id}`}> # {pokemon?.id}</h2>
        <h2 className={`pokemon__body-name ${pokemon?.name}`}>
          {pokemon?.name}
        </h2>

        <div className="pokemon__body-info">
          <div className="pokemon__weight-container">
            <h5 className="pokemon__weight-title">Weight</h5>
            <h4 className="pokemon__weight-data">{pokemon?.weight}</h4>
          </div>
          <div className="pokemon__height-container">
            <h5 className="pokemon__height-title">Height</h5>
            <h4 className="pokemon__height-data">{pokemon?.height}</h4>
          </div>
        </div>

        <div className="pokemon__body-extra">
          <div className="pokemon__types">
            <h3 className=".pokemon__type-title">Type</h3>
            <div className="pokemon__types-value">
              {pokemon?.types.map((type) => (
                <div
                  className={`pokemon__types border-${pokemon?.types[0].type.name}`}
                  key={type.type.name}
                >
                  <span>{type.type.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pokemon__abilities">
            <h3 className="pokemon__abilities-title">Abilities</h3>
            <div className="pokemon__abilities-value">
              {pokemon?.abilities.map((ability) => (
                <div
                  className="pokemon__abilities-border"
                  key={ability.ability.name}
                >
                  <span>{ability.ability.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <section className="pokemon__stats">
          <h2 className="pokemon__stats-title">Stats</h2>
          <section className="pokemon__stats-info">
            {pokemon?.stats.map((stat) => (
              <article className="pokemon__stat" key={stat.stat.name}>
                <div className="pokemon__stat-header">
                  <h4 className="pokemon__stat-name">{stat.stat.name}</h4>
                  <h5 className="pokemon__stat-value">{stat.base_stat}/255</h5>
                </div>
                <div className="pokemon__stat-bar">
                  <div className="pokemon__stat-barGray">
                    <div
                      className="pokemon__stat-barProgress"
                      style={{ width: getPercentBar(stat.base_stat) }}
                    ></div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </section>
      </section>
    </main>
  );
};

export default PokedexInfo;
