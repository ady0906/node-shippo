require('dotenv').config()
const express = require('express');
const config = require('./config');
const request = require('request');


class ProviderAbstract {

  constructor() {

    this.options = {
      url: "https://api.goshippo.com/shipments/",
      method: "POST",
      json: true,
      headers: {
        "Content-Type": "application/json"
      },
      body: {
        "address_to": {
          "name": "Romain Peynichou",
          "street1": "3878 St Laurent Blvd",
          "city": "Montreal",
          "state": "QC",
          "zip": "H2W1Y2",
          "country": "CA"
        },
        "async": false,
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

    this.options.body['address_from'] = addressObject;

    request(this.options, (error, response, body) => {
      if (response.statusCode == 201) {
        let ratesArray = [body.rates][0];
        this.getRatesCallback(ratesArray);
      } else if (response.statusCode == 401) {
        console.log(response.statusCode, 'you failed to authenticate');
      } else {
        console.log(response.statusCode, error);
      }
    });
  }

}

class CanadaPostProvider extends ProviderAbstract {

  constructor(myshippotoken) {
    super();
    this.options.headers['Authorization'] = `ShippoToken ${myshippotoken}`;

    this.getRatesCallback = (arr) => {
      let canadaRates = [];
      arr.forEach((element) => {
        if (element['provider'] == 'Canada Post') {
          canadaRates.push(element);
        }
      })
      if (canadaRates.length == 0) {
        console.log("No Canada Post rates are available for this shipment.")
      } else {
        console.log(canadaRates);
        return canadaRates;
      }
    };
  }

}

const myAddress = {
  "name": "Adrien Peynichou",
  "street1": "360 O'Connor Dr ",
  "city": "East York",
  "state": "ON",
  "zip": "M4J2V4",
  "country": "CA"
}

const myCPInstance = new CanadaPostProvider(config.shippo.token)

myCPInstance.getRates(myAddress);

module.exports = {
  ProviderAbstract: ProviderAbstract,
  CanadaPostProvider: CanadaPostProvider,
  myAddress: myAddress
};
