import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/object/pick';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(User.profile.completed, this.onProfileCompleted);
    this.listenTo(User.repos.completed, this.onReposCompleted);
  },

  getInitialState() {
    return {
      repos: {}
    };
  },

  onProfileCompleted(data) {
    this.username = data.login;
    User.repos(data.repos_url, this.username);
  },

  onReposCompleted(data, fromCache) {
    if (!fromCache) {
      data = data
        .filter(this.removeForks)
        .sort(this.sortByPopular)
        .map(this.trimData)
        .slice(0, 5);

      setItem(`repos:${this.username}`, data);
    }

    this.trigger({
      repos: data
    });
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