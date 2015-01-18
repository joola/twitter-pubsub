var amqp = require('amqp');
var connection;
describe('ampq', function () {
  before(function () {
    connection = amqp.createConnection({ host: 'localhost' });
  });
  it('should connect to rabbitmq', function (done) {
    connection.on('ready', function (err) {
      return done(err);
    });
  });
});