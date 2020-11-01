import React from "react";
import { ButtonComponent } from "./Button";

import "./GamePopup.sass";

export const WinState = (win = 0) => {
  switch (win) {
    case 0: return 'Ничья'
    case 1: return 'Вы выиграли'
    case 2: return 'Вы проиграли'
  }
}

export const GamePopupComponent = ({win = 0, onClick = null}) => {
  if(win === null)
    return null

  return (
    <div className="game-popup">
      <p>{WinState(win)}</p>
      <ButtonComponent type="ok" onClick={onClick} />
    </div>
  )
}