import Reflux from 'reflux';
import User from 'actions/user';
import ProfileStore from 'stores/profile';
import pick from 'lodash-node/modern/object/pick';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(User.starred.completed, this.onStarredCompleted);
    this.listenTo(ProfileStore, this.onProfileCompleted);
  },

  getInitialState() {
    return {
      starred: {}
    };
  },

  onProfileCompleted(data) {
    this.username = data.user.login;
    User.starred(data.user.starred_url.replace(/\{\/[a-z]+}/g, ''), data.user.login);
  },

  onStarredCompleted(data, fromCache) {
    if (!fromCache) {
      let results = data.results
        .map((repo) => pick(repo, 'id', 'name', 'html_url', 'description'))
        .slice(0, 5);

      setItem(`${this.username}:starred`, results);
      this.trigger({ starred: results });
    } else {
      this.trigger({ starred: data });
    }
  }
});