const config = require('./config');
const https = require('https');

// cannot use shippo SDK library

class ProviderAbstract {

  constructor() {
    const options = {
      hostname: "api.goshippo.com",
      path: "/shipments",
      headers: {Authorization: `ShippoToken ${config.shippo.token}`}
    }
    return options;
  }

  getRates(addressObject) {
    // to be implemented
  }

}

class CanadaPostProvider extends ProviderAbstract {
  // to be implemented
}

const myAddress = {
  "name": "Adrien Peynichou",
  "street1": "360 O'Connor Dr ",
  "city": "East York",
  "state": "ON",
  "zip": "M4J2V4",
  "country": "CA",
  "phone": "6475343354",
  "email": "adrien.peynichou@gmail.com"
} // structure of the object to be defined

const myCPInstance = new CanadaPostProvider(config.shippo.token)

myCPInstance.getRates(myAddress) // should return an array of available rates
