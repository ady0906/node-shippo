const config = require('./config');
const shippo = require('shippo')(config.shippo.token);

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

const myAddress = {
  "name":
  "company":
  "street_no":
  "street1":
  "street2":
  "city":
  "state":
  "zip":
  "country":
  "phone":
  "email":
} // structure of the object to be defined

const myCPInstance = new CanadaPostProvider('my-shippo-token')

myCPInstance.getRates(myAddress) // should return an array of available rates
