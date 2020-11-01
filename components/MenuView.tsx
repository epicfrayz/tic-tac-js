import React from "react";
import { ButtonComponent } from "./Button";
import { TViewFC } from "./Game";
import { game } from "./GameView";

export const MenuViewComponent: TViewFC = ({ setView }) => {
  const [{ wins, deads }] = game.useStat()

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