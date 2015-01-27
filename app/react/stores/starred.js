import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/object/pick';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(User.profile.completed, this.onProfileCompleted);
    this.listenTo(User.starred.completed, this.onStarredCompleted);
  },

  onProfileCompleted(data) {
    this.username = data.login;
    User.starred(data.starred_url.replace(/\{\/[a-z]+}/g, ''), this.username);
  },

  onStarredCompleted(data, fromCache) {
    if (!fromCache) {
      data = data
        .map((repo) => pick(repo, 'id', 'name', 'html_url', 'description'))
        .slice(0, 5);

      setItem(`starred:${this.username}`, data);
    }

    this.trigger({
      starred: data
    });
  }
});