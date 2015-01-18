import Reflux from 'reflux';
import req from 'reqwest';
import { getItem } from 'mixins/cache';
import partial from 'lodash-node/modern/functions/partial'

var User = Reflux.createActions({
  search: { asyncResult: true },
  profile: { asyncResult: true },
  repos: { asyncResult: true },
  starred: { asyncResult: true }
});

User.search.listen(function(query) {
  var cachedData = getItem(JSON.stringify(query));

  if (cachedData) {
    return this.completed(query, cachedData, true);
  }

  req({
    url: 'https://api.github.com/search/users',
    data: query,
    type: 'json'
  })
    .then(partial(this.completed, query))
    .fail(partial(this.failed, query));
});

User.profile.listen(function(username) {
  var cachedData = getItem(`profile:${username}`);

  if (cachedData) {
    return this.completed(cachedData, true);
  }

  req({
    url: `https://api.github.com/users/${username}`,
    type: 'json'
  })
    .then(this.completed)
    .fail(this.failed);
});

User.repos.listen(function(url, username) {
  var cachedData = getItem(`repos:${username}`);

  if (cachedData) {
    return this.completed(cachedData, true);
  }

  req({
    url,
    type: 'json'
  })
    .then(this.completed)
    .fail(this.failed);
});

User.starred.listen(function(url, username) {
  var cachedData = getItem(`starred:${username}`);

  if (cachedData) {
    return this.completed(cachedData, true);
  }

  req({
    url,
    type: 'json'
  })
    .then(this.completed)
    .fail(this.failed);
});

export default User
