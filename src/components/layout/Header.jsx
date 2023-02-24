import React from "react";
import { useDispatch } from "react-redux";
import "../../store/slices/trainer.slice";
import { logOut } from "../../store/slices/trainer.slice";
import "./styles/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    dispatch(logOut());
  };
  return (
    <header className="header">
      <div className="header__red">
        <div>
          <img className="header__img" src="/images/pokedex.png" alt="" />
        </div>
      </div>
      <div>
        <div className="header__black">
          <div className="header__pokeball">
            <button className="header__btn" onClick={handleClickLogOut}>
              <i className="bx bxs-exit"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
