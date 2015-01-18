var twitter = require('twitter'),
  yaml = require('js-yaml'),
  fs = require('fs');

var config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));
var connection;
describe("twitter", function() {
  before(function() {
    connection = new twitter({
      consumer_key: config.twitter.consumer_key,
      consumer_secret: config.twitter.consumer_secret,
      access_token_key: config.twitter.access_token_key,
      access_token_secret: config.twitter.access_token_secret
    });
  });
  it("should connect to twitter api and fetch favorites", function(done) {
    connection.get('favorites/list', function(error, params, response){
      done(error);
    });
  });
});