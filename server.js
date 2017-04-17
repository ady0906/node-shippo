require('dotenv').config()
const config = require('./config');
const request = require('request');


class ProviderAbstract {

  constructor() {

    // this.getRatesCallback = () => {};

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
          "country": "CA",
          "phone": "5146773006",
          "email": "romainpeynichou@gmail.com"
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
      } else {
        console.log(response.statusCode);
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
      console.log(canadaRates);
      return canadaRates;
    };
  }
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
}

const myCPInstance = new CanadaPostProvider(config.shippo.token)

myCPInstance.getRates(myAddress); // should return an array of available rates
