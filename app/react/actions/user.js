import Reflux from 'reflux';
import req from 'reqwest';
import { getItem } from 'mixins/cache';

var User = Reflux.createActions({
  'search': { asyncResult: true },
  'profile': { asyncResult: true },
  'repos': { asyncResult: true },
  'starred': { asyncResult: true }
});

User.search.listen(function(query) {
  var cachedData = getItem(JSON.stringify(query));

  if (cachedData) {
    return this.completed(query, cachedData);
  }

  req({
    url: 'https://api.github.com/search/users',
    data: query,
    type: 'json'
  })
    .then(this.completed.bind(this, query))
    .fail(this.failed.bind(this, query));
});

export default User
