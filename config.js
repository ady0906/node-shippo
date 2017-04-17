const config = {};

config.shippo = {};

config.shippo.token = process.env.SHIPPO_KEY || 'shippo token';

config.shippo.test = process.env.SHIPPO_TEST || 'shippo test';

module.exports = config;
