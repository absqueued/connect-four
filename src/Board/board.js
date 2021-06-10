/** Grid */

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import localforage from "localforage";

import { log } from "../utils"; // eslint-disable-line
import { APP_DEFAULTS } from '../constants';

const BoardGrid = ({currentPlayer, onPlayerMoves}) => {
  const rows = Array.from({length: APP_DEFAULTS.rows});
  const cols = Array.from({length: APP_DEFAULTS.cols});  
  const [ allUsers, setAllUsers ] = useState({});
  const [ positions, setPositions ] = useState([
    {x: 5, y: 5, p: 'blue'},
    {x: 1, y: 5, p: 'red'}
  ]);

  const isWinner = () => {
    const winner = false;
    const redPos = positions.filter(pos => pos.p === 'red')
    const bluePos = positions.filter(pos => pos.p === 'blue')

    log(positions);
    // if(bluePos.length > 3) {
    //   bluePos.forEach(p => {
    //     // check
    //   })
    // }    
  }

  const hasDisc = (x, y) => {
    return positions.find(pos => pos.x === x && pos.y === y);
  }

  const makeMove = (x, y, p) => {
    let anyDisc = null;
    let nextAvailableYPos = -1;
    for(let yi = rows.length - 1; yi >=0; yi--) {
      anyDisc = hasDisc(x, yi);
      if(!anyDisc) {
        nextAvailableYPos = yi;
        break;
      }
    }

    if (nextAvailableYPos === -1){ return false }
    setPositions(positions => [...positions, { x, y: nextAvailableYPos, p }]);        
    changeTurn(p);
  }

  localforage.getItem('users').then(usr => {
    if(!Object.keys(allUsers).length) setAllUsers(usr);
  })

  const changeTurn = currentPlayer => {
    const newPlayer = APP_DEFAULTS.allColors.filter(c => c !== currentPlayer).join('');
    localforage.setItem('currentPlayer', newPlayer).then(v => {
      onPlayerMoves(v)
    })
  };

  useEffect(() => {
    const winner = isWinner();
  }, [positions ]);


  return (
      <article>
        <div className={`board-grid board-grid--${currentPlayer}`}>
          {cols.map((c, x) => (
            <div
              key={uuidv4()}
              className="box-row">
              
              {
                rows.map((r, y) => {
                  const disc = hasDisc(x, y);
                  return (
                  <div
                    key={uuidv4()}
                    onClick={() => makeMove(x, y, currentPlayer) }
                    className={`box box--${disc ? disc.p : ''}`}>
                    {`Box x: ${x}, y: ${y}`}
                  </div>
                )})
              }
            </div>
          ))}
        </div>
      </article>
  );
};

export { BoardGrid };
