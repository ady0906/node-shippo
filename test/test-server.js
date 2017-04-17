const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');
const config = require('../config');

chai.use(chaiHttp);

describe('Address Object', function() {
  let address = server.myAddress;
  it('should have all the required properties', function() {
    address.should.be.an('object');
      address.should.have.property('name');
      address.should.have.property('street1');
      address.should.have.property('city');
      address.should.have.property('state');
      address.should.have.property('zip');
      address.should.have.property('country');
  })
});

describe('Response Object', function() {
  let testShippo = config.shippo.test;
  it('should be an array of objects', function(done) {
    chai.request('https://api.goshippo.com')
      .post('/shipments/')
      .send({
        json: true,
        headers: {
          "Authorization": `ShippoToken ${testShippo}`,
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
          "address_from": {
            "name": "Adrien Peynichou",
            "street1": "360 O'Connor Dr ",
            "city": "East York",
            "state": "ON",
            "zip": "M4J2V4",
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
      })
      .end((error, response) => {
        response.statusCode.should.equal(201);
        done();
      })
    })
  })
