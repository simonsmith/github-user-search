import Reflux from 'reflux';
import User from 'actions/user';
import ProfileStore from 'stores/profile';
import pick from 'lodash-node/modern/object/pick';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(ProfileStore, this.onProfileCompleted);
    this.listenTo(User.repos.completed, this.onReposCompleted);
  },

  getInitialState() {
    return {
      repos: {}
    };
  },

  onProfileCompleted(data) {
    this.username = data.user.login;
    User.repos(data.user.repos_url, data.user.login);
  },

  onReposCompleted(data, fromCache) {
    if (!fromCache) {
      let results = data.results
        .filter(this.removeForks)
        .sort(this.sortByPopular)
        .map(this.trimData)
        .slice(0, 5);

      setItem(`${this.username}:repos`, results);
      this.trigger({ repos: results });
    } else {
      this.trigger({ repos: data });
    }
  },

  removeForks(item) {
    return item.fork == false;
  },

  sortByPopular(a, b) {
    return b.stargazers_count - a.stargazers_count;
  },

  trimData(repo) {
    return pick(repo,
      'id',
      'name',
      'html_url',
      'description',
      'stargazers_count'
    )
  }
});