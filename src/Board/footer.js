/** Grid */

// import { useState } from "react";
import localforage from "localforage";

import { log } from "../utils"; // eslint-disable-line
import { GAME_STATE } from "../constants";

const BoardFooter = ({onChange}) => {
  const reset = () => {
    localforage.clear();
    onChange(false);
  };

  const quit = () => {
    localforage.setItem(GAME_STATE.start, false).then(v => {
      onChange(v);
    });
    log("Quit");
  };
  return (
    <footer>
      <button className="btn-tb btn-tb--p" onClick={() => reset()}>
        Reset
      </button>
      <button className="btn-tb btn-tb--d" onClick={() => quit()}>
        Quit
      </button>
    </footer>
  );
};


export { BoardFooter };
