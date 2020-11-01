import React, { FC } from "react";
import { createShareStore } from "../lib/SharedStore";
import { ButtonComponent } from "./Button";
import { TViewFC } from "./Game";
import { GameViewComponent } from "./GameView";

export const statStore = createShareStore({
  wins: 0,
  deads: 0
}, 'user-stat')

export const MenuViewComponent: TViewFC = ({ setView }) => {
  const { useState: useStat } = statStore
  const [{ wins, deads }] = useStat()

  const refresh = () => {
    setView('game')
  }

  return (
    <div className="game-container">
      <table className="game-state">
        <tbody>
          <tr>
            <td>Побед:</td>
            <td className="color-gamewin">{wins}</td>
          </tr>
          <tr>
            <td>Поражений:</td>
            <td className="color-gameover">{deads}</td>
          </tr>
        </tbody>
      </table>

      <ButtonComponent onClick={refresh} type="refresh" />
    </div>
  )
}