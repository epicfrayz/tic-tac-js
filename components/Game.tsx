import React, { FC, useState } from "react";

import "./Game.sass";

import { GameViewComponent } from "./GameView";
import { MenuViewComponent } from "./MenuView";

export const ViewModels = {
  menu: MenuViewComponent,
  game: GameViewComponent
}

export type TViewMode = keyof typeof ViewModels
export type TViewFC = FC<{setView(v: TViewMode): void}>

export const GameComponent = () => {
  const [model, setView] = useState<TViewMode>('game')
  const View = ViewModels[model]

  return (
    <div className="game">
      <View setView={setView} />
    </div>
  )
}