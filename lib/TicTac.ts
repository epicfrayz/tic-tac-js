import { createShareStore } from "./SharedStore";

export interface IRowItem {
  v: number
  i: number
}

export type TFuncValue<T> = (() => T) | T

export class TicTacGame {
  #map = new Uint8Array(9)
  #winRow: IRowItem[] = []
  #store = createShareStore([...this.#map])
  #stat = createShareStore({
    wins: 0,
    deads: 0
  }, 'user-stat')

  get winRow() {
    return this.#winRow || []
  }

  get win() {
    if (this.#map.indexOf(0) == -1)
      return 0

    const [win] = this.winRow

    if (!win) return null

    return win.v
  }

  get player() {
    const xValue = this.getCountOfValue(1)

    if (!xValue)
      return 1

    if (xValue == this.getCountOfValue(2))
      return 1

    return 2
  }

  useGame() {
    return this.#store.useState()
  }

  useStat() {
    return this.#stat.useState()
  }

  getCountOfValue(value: TFuncValue<number>) {
    if (typeof value == 'function')
      value = value()

    return this.#map.filter(e =>
      e == value).length
  }

  checkWin() {
    const findWin = this.getWinRow()

    if (findWin)
      return findWin[0].v

    if (this.#map.indexOf(0) == -1)
      return 0

    return null
  }

  getWinRow() {
    const regExp = /(111|222)/
    const winRow = this.getAllRows()
      .find(([a, b, c]) =>
        regExp.test(`${a.v}${b.v}${c.v}`))

    return this.#winRow = winRow
  }

  getIndexOfVec(x = 0, y = 0) {
    return y * 3 + x
  }

  getVecOfIndex(i = 0) {
    const y = i % 3
    const x = (i - y) / 3
    return { x, y }
  }

  getAllRowItem() {
    return [...this.#map].map((v, i) => {
      return { v, i } as IRowItem
    })
  }

  getVerticalRow(fX = 0) {
    const out: IRowItem[] = []

    this.#map.forEach((v, i) => {
      const { x } = this.getVecOfIndex(i)

      if (x == fX)
        out.push({ v, i })
    })

    return out
  }

  getHorizontalRow(fY = 0) {
    const out: IRowItem[] = []

    this.#map.forEach((v, i) => {
      const { y } = this.getVecOfIndex(i)

      if (y == fY)
        out.push({ v, i })
    })

    return out
  }

  getDiagonalRow(rev = false) {
    const out: IRowItem[] = []

    this.#map.forEach((v, i) => {
      const { x, y } = this.getVecOfIndex(i)

      if ((rev ? 2 - x : x) == y)
        out.push({ v, i })
    })

    return out
  }

  getAllRows() {
    const rows: Array<IRowItem[]> = []

    for (let a = 0; a < 3; a++) {
      rows.push(
        this.getVerticalRow(a),
        this.getHorizontalRow(a)
      )
    }

    for (let a = 0; a < 2; a++) {
      rows.push(
        this.getDiagonalRow(!!a)
      )
    }

    return rows
  }

  setValue(index = this.getAIStep(), value = this.player) {
    if (typeof this.#map[index] != 'undefined')
      this.#map[index] = value

    this.checkWin()

    if (this.win == 1)
      this.addWin()

    if (this.win == 2)
      this.addDead()

    this.#store.set([...this.#map])
  }

  isNotWin(index = -1) {
    const { winRow } = this

    return winRow.length &&
      !winRow.find(e => e.i == index)
  }

  resetGame() {
    this.#map.forEach(
      (e, i, t) => t[i] = 0)

    this.#winRow = null
    this.setValue(-1)
  }

  addWin() {
    const { wins } = this.#stat.get()
    this.#stat.set({ wins: wins + 1 })
  }

  addDead() {
    const { deads } = this.#stat.get()
    this.#stat.set({ deads: deads + 1 })
  }

  getAIStep() {
    const rows = this.getAllRows()
    const rand = () => Math.random() > 0.5 ? 1 : -1
    const now = this.player == 1 ? '011' : '022'
    const next = this.player == 2 ? '011' : '022'

    const forWin = rows.filter(e => {
      return e.map(e => e.v).sort().join('') == now
    }).sort(rand)[0]

    if (forWin)
      return forWin.find(e => e.v == 0).i

    const forNotDead = rows.filter(e => {
      return e.map(e => e.v).sort().join('') == next
    }).sort(rand)[0]

    if (forNotDead)
      return forNotDead.find(e => e.v == 0).i

    return this.getAllRowItem()
      .filter(e => e.v == 0)
      .sort(rand)[0].i
  }
}