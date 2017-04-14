const config = require('./config');
const https = require('https');
const request = require('request');

// cannot use shippo SDK library

class ProviderAbstract {

  constructor() {
    this.options = {
      url: "https://api.goshippo.com/shipments/",
      headers: {
        "Authorization": `ShippoToken ${config.shippo.token}`,
        "Content-Type": "application/json"
      },
      data: {
        "address_to": {
          "name": "Romain Peynichou",
          "street1": "3878 St Laurent Blvd",
          "city": "Montreal",
          "state": "QC",
          "zip": "H2W1Y2",
          "country": "CA",
          "phone": "5146773006",
          "email": "romainpeynichou@gmail.com"
        },
        "async": false,
        "customs_declaration": {
          "contents_type": "MERCHANDISE",
          "contents_explanation": "Shipping ain't easy!",
          "non_delivery_option": "RETURN",
          "certify": true,
          "certify_signer": "Shippo",
          "items": [
            {
              "description": "My Parcel",
              "quantity": 1,
              "net_weight": "2",
              "mass_unit": "lb",
              "value_amount": 13.37,
              "value_currency": "USD",
              "metadata": "Your first Customs Item",
              "origin_country": "US"
            }
          ],
          "metadata": "Your first Customs Declaration!"
        },
        "parcels": [
          {
            "length": "5",
            "width": "5",
            "height": "5",
            "distance_unit": "in",
            "weight": "2",
            "mass_unit": "lb"
          }
        ]
      }
    }
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
