import {filterLength} from "./Utils";

export const getVec = (i = 0, s = 3) => {
  let y = i % s
  return { x: (i - y) / s, y }
}

export const getPlayer = (state: number[]) => {
  const xValue = filterLength(state, 1)
  const oValue = filterLength(state, 2)

  if (!xValue)
    return 1

  if (xValue == oValue)
    return 1

  return 2
}

export const checkWin = (s: number[]) => {
  const regExp = /(111|222)/
  const rows: string[] = []

  for (let a = 0; a < 3; a++) {
    const addRows = [
      s.filter((e, i) => {
        return getVec(i).y == a
      }),
      s.filter((e, i) => {
        return getVec(i).x == a
      })
    ].map(e => e.join(''))

    rows.push(...addRows)
  }

  rows.push(
    s.filter((e, i) => {
      let vec = getVec(i)
      return vec.x == vec.y
    }).join(''),
    s.filter((e, i) => {
      let vec = getVec(i)
      return 2 - vec.x == vec.y
    }).join('')
  )

  const findWin = rows.find(
    e => regExp.test(e))

  if(findWin)
    return +findWin[0]

  if(typeof s.find(e=> e==0) !== 'number')
    return 0

  return null
}