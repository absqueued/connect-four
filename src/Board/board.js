/** Grid */

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import localforage from "localforage";

import { log } from "../utils"; // eslint-disable-line
import { APP_DEFAULTS, GAME_STATE } from "../constants";

const BoardGrid = ({ currentPlayer, onPlayerMoves }) => {
  const rows = Array.from({ length: APP_DEFAULTS.rows });
  const cols = Array.from({ length: APP_DEFAULTS.cols });

  const [allUsers, setAllUsers] = useState({});
  const [positions, setPositions] = useState([]);
  const [gameState, setGameState] = useState(GAME_STATE.start);

  const hasDisc = (x, y) => {
    return positions.find((pos) => pos.x === x && pos.y === y);
  };

  const makeMove = (x, y, p) => {
    if(gameState !== GAME_STATE.playing && gameState !== GAME_STATE.draw) return;

    let anyDisc = null;
    let nextAvailableYPos = -1;
    for (let yi = rows.length - 1; yi >= 0; yi--) {
      anyDisc = hasDisc(x, yi);
      if (!anyDisc) {
        nextAvailableYPos = yi;
        break;
      }
    }

    if (nextAvailableYPos === -1) {
      return false;
    }
    setPositions((positions) => [...positions, { x, y: nextAvailableYPos, p }]);
    changeTurn(p);
  };

  localforage.getItem("users").then((usr) => {
    if (!Object.keys(allUsers).length) setAllUsers(usr);
  });

  const changeTurn = (currentPlayer) => {
    const newPlayer = APP_DEFAULTS.allColors
      .filter((c) => c !== currentPlayer)
      .join("");
    localforage.setItem("currentPlayer", newPlayer).then((v) => {
      onPlayerMoves(v);
    });
  };

  const annouceWinner = (state) => {
    if (state === "red" || state === "blue") {
      const winner = allUsers[state];
      setGameState(winner);
    } else {
      setGameState(state);
    }
  };

  const unDo = () => {
    setPositions(pos => pos.slice(0, pos.length - 1));
    changeTurn(currentPlayer);
  }

  useEffect(() => {
    let x, y;
    const checkWinState = (positions) => {
      const allCombos = new Set(
        positions.map((pos) => [pos.x, pos.y].join(pos.p))
      );

      //3blue5

      for (let pos of positions) {
        for ([x, y] of [
          [0, 1],
          [1, 0],
          [1, 1],
          [1, -1],
        ]) {
          if (
            [1, 2, 3].every((i) => {
              let currCombo = [pos.x + i * x, pos.y + i * y].join(pos.p);
              return allCombos.has(currCombo);
            })
          ) {
            return pos.p;
          }
        }
      }

      if (positions.length === rows.length * cols.length) {
        return GAME_STATE.draw;
      } else {
        return GAME_STATE.playing;
      }
    };

    const result = checkWinState(positions);
    annouceWinner(result);
  }, [positions]);

  return (
    <article>
      
      {gameState !== GAME_STATE.playing && <h1>Winner is: {gameState}</h1>}

      <div className={`board-grid board-grid--${currentPlayer}`}>
        {cols.map((c, x) => (
          <div key={uuidv4()} className="box-row">
            {rows.map((r, y) => {
              const disc = hasDisc(x, y);
              return (
                <div
                  key={uuidv4()}
                  onClick={() => makeMove(x, y, currentPlayer)}
                  className={`box box--${disc ? disc.p : ""}`}
                >
                  {`Box x: ${x}, y: ${y}`}
                </div>
              );
            })}
          </div>
        ))}
        <div>
            <button className="btn-tb btn-tb--p" onClick={()=> unDo()}>Undo</button>
          </div>
      </div>
    </article>
  );
};

export { BoardGrid };
