/** Grid */

import { useState } from 'react';
import localforage from "localforage";

import { log } from "../utils"; // eslint-disable-line
import { BoardHeader } from "./header";
import { BoardGrid } from "./board";
import { BoardFooter } from "./footer";
import { APP_DEFAULTS } from '../constants';

const Board = ({onChange}) => {
  const [ currentPlayer, setCurrentPlayer ] = useState(APP_DEFAULTS.starterColor);
  const [ allUsers, setAllUsers ] = useState({});

  localforage.getItem('users').then(usr => {
    if(!Object.keys(allUsers).length) setAllUsers(usr);
  })

  return (
    <section className="board">      
      <BoardHeader theme={currentPlayer} player={allUsers[currentPlayer]} />
      <BoardGrid currentPlayer={currentPlayer} onPlayerMoves={(v) => setCurrentPlayer(v) } />
      <BoardFooter onChange={onChange} />
    </section>
  );
};

export { Board };
