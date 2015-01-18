import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/objects/pick';
import map from 'lodash-node/modern/collections/map';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(User.search.completed, this.onSearchCompleted);
    this.listenTo(User.search.failed, this.onSearchFailed);
  },

  onSearchCompleted(query, data, fromCache) {
    if (!fromCache) {
      data = this.trimData(data);
      setItem(JSON.stringify(query), data);
    }

    this.trigger({
      results: data,
      query
    });
  },

  onSearchFailed(query, xhr) {
    this.trigger({
      results: {
        items: [],
        error: JSON.parse(xhr.responseText)
      },
      query
    });
  },

  trimData(data) {
    data = pick(data, 'items', 'total_count');
    data.items = map(data.items, item => pick(item, 'avatar_url', 'id', 'login'));
    return data;
  }
});
