import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../store/slices/trainer.slice.js";
import { setTrainerGlobal } from "../store/slices/Trainer.slice";
import "../components/Pokedex/styles/home.css";
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setTrainerGlobal(e.target.name.value.trim()));
    e.target.name.value = "";
    navigate("/pokedex");
  };

  return (
    <div className="home">
      <div className="home__container">
        <div className="home__div">
          <h1 className="home__title">Hi Trainer! Give your name to start</h1>
          <form className="home__form" onSubmit={handleSubmit}>
            <input className="home__input" id="name" type="text" />
            <button className="home__btn">Start</button>
          </form>
        </div>
      </div>
      <footer className="home__footer">
        <img className="home__footer__img" src="/images/pokedex.png" alt="" />
        <div className="home__footer__red" />
        <div className="home__footer__black" />
      </footer>
    </div>
  );
};

export default Home;
