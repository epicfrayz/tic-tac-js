import React, { FC } from "react";

import "./Button.sass";

interface IButtonProps {
  type?: 'refresh' | 'x-value' | 'o-value' | 'default' | 'ok',
  onClick?(e: MouseEvent): void
  opacity?: number
}

export const ButtonComponent: FC<IButtonProps> = (props) => {
  const { type = 'default', onClick, opacity = 1 } = props
  const className = `btn ${type} ${onClick ? 'clicked' : ''}`
  return (
    <button 
      style={{opacity}}
      onClick={onClick as any}
      className={className} />
  )
}