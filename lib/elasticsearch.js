var elasticsearch = require('elasticsearch'),
  yaml = require('js-yaml'),
  fs = require('fs');
var config = yaml.safeLoad(fs.readFileSync('./config.yaml', 'utf8'));

var es = new elasticsearch.Client({
  host: config.elasticsearch.host
});

exports.index = function (body, callback) {
  var index = {
    index: 'twitter',
    type: 'tweet',
    id: body.id,
    body: body
  };
  es.index(index, function (err, res) {
    return callback(err);
  });
};