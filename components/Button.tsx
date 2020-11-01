import React, { FC } from "react";

import "./Button.sass";

interface IButtonProps {
  type?: 'refresh' | 'x-value' | 'o-value' | 'default' | 'ok',
  onClick?(e: MouseEvent): void
}

export const ButtonComponent: FC<IButtonProps> = (props) => {
  const { type = 'default', onClick } = props
  const className = `btn ${type} ${onClick ? 'clicked' : ''}`
  return (
    <button 
      onClick={onClick as any}
      className={className} />
  )
}