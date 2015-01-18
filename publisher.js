var amqp = require('amqp'),
  twitter = require('./lib/twitter');
var connection = amqp.createConnection({ host: 'localhost' });

connection.on('ready', function () {
  var exchange = connection.exchange('twitter-exchange');
  twitter.init({}, function () {
    twitter.startStream('#charliehebdo', function (data) {
      exchange.publish("twitter-key", data, {contentType: 'application/json'});
    });
  });
});