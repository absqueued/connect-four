/* Start */
import localforage from "localforage";

import { log } from "../utils"; // eslint-disable-line
import { APP_DEFAULTS, GAME_STATE } from "../constants";


const Logo = ({ size = "md" }) => {
  return (
    <div className={`logo-wrap logo-wrap--${size}`}>
      <h1 className="logo">
        <span>"Connect</span> <span>Four"</span>
      </h1>
    </div>
  );
};

const Start = ({ onStart }) => {

  const startGame = () => {
    const playerRed = prompt("Player One name?");
    const playerBlue = prompt("Player Two name?");

    if(!playerRed || !playerBlue) return false;
    
    localforage.setItem('currentPlayer', APP_DEFAULTS.starterColor);
    
    localforage
      .setItem("users", {
        red: playerRed,
        blue: playerBlue,
      })
      .then(() => {
        localforage.setItem(GAME_STATE.start, true).then(v => {
          onStart(v);
        });
      });
  };
  return (
    <section className="page page--start">
      <Logo />
      <p>Simple as a straight line</p>
      <button
        onClick={startGame}
        type="button"
        className="btn-start"
        rel="noopener noreferrer"
      >
        Play Now
      </button>
    </section>
  );
};

export { Start, Logo };
