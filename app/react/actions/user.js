import Reflux from 'reflux';
import request from 'reqwest';
import { getItem } from 'mixins/cache';
import gitHubAPI from 'api/github';
import partial from 'lodash-node/modern/function/partial'

var User = Reflux.createActions({
  search: { asyncResult: true },
  profile: { asyncResult: true },
  repos: { asyncResult: true },
  starred: { asyncResult: true }
});

User.search.listen(function(url) {
  // Use the url as the cachekey
  getAPIItem.call(this, url, url);
});

function getAPIItem(cacheKey, url, username) {
  var cached = getItem(`${username}:${cacheKey}`);

  if (cached) {
    return this.completed(cached, true);
  }

  gitHubAPI(url)
    .then(this.completed)
    .fail(this.failed);
}

User.profile.listen(partial(getAPIItem, 'profile'));
User.repos.listen(partial(getAPIItem, 'repos'));
User.starred.listen(partial(getAPIItem, 'starred'));

export default User
