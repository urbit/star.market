const ob = require('urbit-ob')

export default class Star {
  point: number
  name: string
  isUnlinked: boolean

  constructor(data: {
    point: number,
    isUnlinked: boolean,
  }) {
    this.point = data.point
    this.name = ob.patp(this.point)
    this.isUnlinked = data.isUnlinked
  }

  compareTo = (star: Star) : number => {
    if (this.isUnlinked === star.isUnlinked) {
      if (this.name === star.name) {
        return 0
      }

      return this.name > star.name ? 1 : -1
    } else {
      return this.isUnlinked ? 1 : -1
    }
  }

  getDisabledMessage = () => 'Cannot swap, has been booted'
}
