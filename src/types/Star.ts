export default class Star {
  point: number
  name: string
  canTrade: boolean

  constructor(data: {
    point: number,
    name: string,
    canTrade: boolean,
  }) {
    this.point = data.point
    this.name = data.name
    this.canTrade = data.canTrade
  }

  compareTo = (star: Star) : number => {
    if (this.canTrade === star.canTrade) {
      if (this.name === star.name) {
        return 0
      }

      return this.name > star.name ? 1 : -1
    } else {
      return this.canTrade ? 1 : -1
    }
  }
}
