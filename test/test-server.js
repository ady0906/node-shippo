const rewire = require('rewire');
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../server');

chai.use(chaiHttp);

describe('Address Object', function() {
  it('should have all the required properties', function() {
    let address = server.myAddress;

    address.should.be.an('object');
  })
});
