import React, { useState } from "react";
import { TicTacGame } from "../lib/TicTac";
import { ButtonComponent } from "./Button";
import { GamePopupComponent } from "./GamePopup";
import { TViewFC } from "./Game";

import "./GameView.sass"

export const game = new TicTacGame()

export const GameViewComponent: TViewFC = ({ setView }) => {
  const [win, setWin] = useState<number>(null)
  const [state] = game.useGame()

  const checkWin = () => {
    const findWin = game.checkWin()

    if (findWin !== null) {
      if (findWin == 1)
        game.addWin()

      if (findWin == 2)
        game.addDead()

      setWin(findWin)
    }
  }

  if(game.player == 2 && win == null)
    setTimeout(() => {
      const int = game.getAIStep()
      game.setValue(int)
      checkWin()
    }, Math.random() * 300 + 200)

  const handleClick = (index = -1) => {
    if (win)
      return null

    if(game.player != 1)
      return null

    game.setValue(index)
    checkWin()
  }

  const out = () => {
    setView('menu')
    game.resetGame()
  }

  
  return (
    <div className="game-container-grid">
      {state.map((e, i) =>
        <ButtonComponent
          opacity={game.isNotWin(i) ? 0.2 : 1}
          key={`btn-${i}`}
          onClick={!e ? () => handleClick(i) : null}
          type={e ? (e == 1 ? 'x-value' : 'o-value') : 'default'} />
      )}

      <GamePopupComponent onClick={out} win={win} />
    </div>
  )
}