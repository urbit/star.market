const ob = require('urbit-ob')

export default class Star {
  point: number
  name: string
  canTrade: boolean
  isComplete: boolean
  isUnlinked: boolean

  constructor(data: {
    point: number,
    canTrade: boolean,
    isComplete: boolean,
    isUnlinked: boolean,
  }) {
    this.point = data.point
    this.name = ob.patp(this.point)
    this.canTrade = data.canTrade
    this.isComplete = data.isComplete
    this.isUnlinked = data.isUnlinked
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

  getDisabledMessage = () => `Cannot swap, ${this.isComplete ? 'has been linked' : 'has spawned planets'}`
}
