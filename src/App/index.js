import { useState } from 'react';
import localforage from "localforage";

import { log } from '../utils'; // eslint-disable-line
import { GAME_STATE } from '../constants';
import { Start } from '../Start';
import { Board } from '../Board';

function App() {
  const [ start, setStart ] = useState(false);

  localforage.getItem(GAME_STATE.start).then(state => {
    setStart(state);
  });

  return (
    <main>
      {!start && <Start onStart={v => setStart(v)} />}
      {start && <Board onChange={v => setStart(v)} />}
    </main>
  );
}

export default App;
