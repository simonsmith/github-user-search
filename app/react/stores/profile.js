import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/object/pick';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(User.profile.completed, this.onProfileCompleted);
  },

  getInitialState() {
    return {
      user: {}
    };
  },

  onProfileCompleted(data, fromCache) {
    if (!fromCache) {
      // Only take properties that are needed
      let results = pick(data.results,
        'avatar_url',
        'blog',
        'followers',
        'following',
        'repos_url',
        'starred_url',
        'location',
        'login',
        'name',
        'public_repos',
        'html_url');
      setItem(`${results.login}:profile`, results);
      this.trigger({ user: results });
    } else {
      this.trigger({ user: data });
    }
  }
});