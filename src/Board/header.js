/** Grid */

import { log } from "../utils"; // eslint-disable-line

import { Logo } from "../Start";

const Player = ({ name = "John", theme = 'blue'}) => {
  return (
    <div className={`player player--${theme}`}>TURN: {name}</div>
  );
};

const BoardHeader = ({theme, player}) => {

  return (
      <header>
        <Logo size="sm" />
        <Player name={player} theme={theme} />
      </header>
  );
};

export { BoardHeader };
