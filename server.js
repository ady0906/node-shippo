

class ProviderAbstract {

  constructor() {
    // to be implemented
  }

  getRates(addressObject) {
    // to be implemented
  }

}

class CanadaPostProvider extends ProviderAbstract {
  // to be implemented
}

const myAddress = {} // structure of the object to be defined

const myCPInstance = new CanadaPostProvider('my-shippo-token')

myCPInstance.getRates(myAddress) // should return an array of available rates
