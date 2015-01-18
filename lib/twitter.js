var twitter = require('twitter'),
  yaml = require('js-yaml'),
  fs = require('fs');

var config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));

var twit = module.exports;

twit.init = function (options, callback) {
  twit.connection = new twitter({
    consumer_key: config.twitter.consumer_key,
    consumer_secret: config.twitter.consumer_secret,
    access_token_key: config.twitter.access_token_key,
    access_token_secret: config.twitter.access_token_secret
  });
  if (callback)
    callback();
  return twit;
};

twit.startStream = function (keywords, callback) {
  twit.connection.stream('filter', {track: keywords}, function (stream) {
    stream.on('data', function (data) {
      callback(data);
    });
    stream.on('error', function (err) {
      console.log(err);
    })
  });
};