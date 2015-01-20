import Reflux from 'reflux';
import request from 'reqwest';
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
    return this.completed(cachedData, true);
  }

  var r = request({
    url: 'https://api.github.com/search/users',
    data: query,
    type: 'json'
  })
    .then(data => this.completed({
      data,
      query,
      xhr: r.request
    }, false))
    .fail(partial(this.failed, query));
});

function fetchData(cacheKey, url, username) {
  var cachedData = getItem(`${cacheKey}:${username}`);

  if (cachedData) {
    return this.completed(cachedData, true);
  }

  request({
    url,
    type: 'json'
  })
    .then(this.completed)
    .fail(this.failed);
}

User.profile.listen(function(username) {
  fetchData.call(this, 'profile', `https://api.github.com/users/${username}`, username);
});
User.repos.listen(partial(fetchData, 'repos'));
User.starred.listen(partial(fetchData, 'starred'));

export default User
