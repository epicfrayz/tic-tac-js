import React, { useState } from "react";
import { checkWin, getPlayer } from "../lib/TicTac";
import { ButtonComponent } from "./Button";
import { GamePopupComponent } from "./GamePopup";
import { TViewFC } from "./Game";

import "./GameView.sass"
import { statStore } from "./MenuView";

export const GameViewComponent: TViewFC = ({ setView }) => {
  const [state, setState] = useState([...new Uint8Array(9)])
  const [win, setWin] = useState<number>(null)
  const player = getPlayer(state)

  const handleClick = (index = -1) => {
    if (win)
      return null

    if (typeof state[index] == 'undefined')
      return null

    const newState = state.map((e, i) =>
      i == index ? player : e)

    const findWin = checkWin(newState)

    let { wins, deads } = statStore.get()

    if (findWin !== null) {
      if (findWin == 1)
        wins += 1

      if (findWin == 2)
        deads += 1

      statStore.set({ wins, deads })
      setWin(findWin)
    }

    setState(newState)
  }

  return (
    <div className="game-container-grid">
      {state.map((e, i) =>
        <ButtonComponent
          key={`btn-${i}`}
          onClick={!e ? () => handleClick(i) : null}
          type={e ? (e == 1 ? 'x-value' : 'o-value') : 'default'} />
      )}
      <GamePopupComponent onClick={() => setView('menu')} win={win} />
    </div>
  )
}