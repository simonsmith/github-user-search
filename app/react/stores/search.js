import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/object/pick';
import map from 'lodash-node/modern/collection/map';
import { setItem } from 'mixins/cache';
import parseLinkHeader from 'utils/parseLinkHeader';

export default Reflux.createStore({
  init() {
    this.listenTo(User.search.completed, this.onSearchCompleted);
    this.listenTo(User.search.failed, this.onSearchFailed);
  },

  getInitialState() {
    return {
      results: {
        items: []
      },
      url: '',
      pagination: {}
    };
  },

  onSearchCompleted(data, fromCache) {
    if (!fromCache) {
      // Only take data that's needed
      let results = pick(data.results, 'items', 'total_count');
      results.items = map(data.results.items, item => pick(item, 'avatar_url', 'id', 'login'));

      // Don't mutate the data param
      let newData = {
        results,
        url: data.url,
        pagination: data.pagination
      };

      // Cache it
      setItem(newData.url, newData);

      // Notify the views
      this.trigger(newData);
    } else {
      // Response came from cache, so send straight to views
      this.trigger(data);
    }
  },

  onSearchFailed(query, xhr) {
    this.trigger({
      results: {
        items: [],
        error: JSON.parse(xhr.responseText)
      },
      query
    });
  }
});
