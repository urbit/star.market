const ob = require('urbit-ob')

export default class Star {
  point: number
  name: string
  isEligible: boolean

  constructor(data: {
    point: number,
    isEligible: boolean,
  }) {
    this.point = data.point
    this.name = ob.patp(this.point)
    this.isEligible = data.isEligible
  }

  compareTo = (star: Star) : number => {
    if (this.isEligible === star.isEligible) {
      if (this.name === star.name) {
        return 0
      }

      return this.name > star.name ? 1 : -1
    } else {
      return this.isEligible ? 1 : -1
    }
  }

  getDisabledMessage = () => 'Cannot swap, has been booted'
}
