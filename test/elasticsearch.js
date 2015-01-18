var elasticsearch = require('elasticsearch'),
  yaml = require('js-yaml'),
  fs = require('fs'),
  config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));
var es;

describe('elasticSearch', function () {
  before(function (done) {
    es = new elasticsearch.Client({
      host: config.elasticsearch.host
    });
    done();
  });
  it('should connect to an elasticsearch server', function (done) {
    es.ping({
      requestTimeout: 1000,
      hello: "elasticsearch!"
    }, function (error) {
      return done(error);
    });
  });
});