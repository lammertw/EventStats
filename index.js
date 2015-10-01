var _ = require('lodash');
var fs = require('fs');

var talksFile = process.argv[2];
var favoritesFile = process.argv[3];

var talks = JSON.parse(fs.readFileSync(talksFile));
var userFavorites = JSON.parse(fs.readFileSync(favoritesFile));

var talkCount = {};

_.each(userFavorites.results, function (favorite) {
  _.each(favorite.favoriteTalks, function (favoriteTalk) {
    var count = talkCount[favoriteTalk.objectId];
    if (!count) {
      count = 0;
    }
    count++;
    talkCount[favoriteTalk.objectId] = count;
  });
});

_.each(_.sortBy(_.map(talkCount, function (count, key) {
    return {
      talk: _.findWhere(talks.results, {objectId: key}).title.en,
      count: count
    };
  }), 'count').reverse(), function (talkCount) {
  console.log(talkCount.talk + ': ' + talkCount.count);
});
