var amqp = require('amqp'),
  elasticsearch = require('./lib/elasticsearch');

var connection = amqp.createConnection({ host: 'localhost' });

connection.on('ready', function () {
  var exchange = connection.exchange('twitter-exchange');
  connection.queue('twitter-queue', function (q) {
    q.bind(exchange, 'twitter-key');
    q.subscribe(function (message) {
      message.ourTimestamp = new Date().toISOString();
      message.orig_text = message.text;
      if (message.geo) {
        message.coords = {
          lat: message.geo.coordinates[0],
          lon: message.geo.coordinates[1]
        };
        delete message.geo;
      }
      message.created_at = new Date(message.created_at).toISOString();
      message._timestamp = {
        "enabled": true,
        "path": "ourTimestamp"
      };
      elasticsearch.index(message, function(err) {
        if (err) throw new Error(err);
      })
    });
  });
});