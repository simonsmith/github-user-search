import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/objects/pick';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(User.profile.completed, this.onProfileCompleted);
  },

  onProfileCompleted(data, fromCache) {
    if (!fromCache) {
      data = pick(data,
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
        'html_url'
      );
      setItem(`profile:${data.login}`, data);
    }

    this.trigger({
      user: data
    });
  }
});