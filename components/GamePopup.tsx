import React from "react";
import { ButtonComponent } from "./Button";

import "./GamePopup.sass";

export const GamePopupComponent = ({win = 0, onClick = null}) => {

  if(!win)
    return null

  return (
    <div className={`game-popup ${win == 1 ? 'win' : ''}`}>
      <p>Вы {win == 1 ? 'выиграли' : 'проиграли'}</p>
      <ButtonComponent type="ok" onClick={onClick} />
    </div>
  )
}