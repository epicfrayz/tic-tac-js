import React, { useEffect, useState } from "react";
import { TicTacGame } from "../lib/TicTac";
import { ButtonComponent } from "./Button";
import { GamePopupComponent } from "./GamePopup";
import { TViewFC } from "./Game";

import "./GameView.sass"

export const game = new TicTacGame()

export const GameViewComponent: TViewFC = ({ setView }) => {
  const [state] = game.useGame()
  const { player, win } = game

  const handleClick = (index = -1) => {
    if (win || player != 1)
      return null

    game.setValue(index)
  }

  const out = () => {
    setView('menu')
    game.resetGame()
  }

  if (player == 2 && win == null)
    setTimeout(() => game.setValue(), 400)

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