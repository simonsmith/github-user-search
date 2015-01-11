import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/objects/pick';
import map from 'lodash-node/modern/collections/map';
import { setItem } from 'mixins/cache';

export default Reflux.createStore({
  init() {
    this.listenTo(User.search.completed, this.onCompleted);
    this.listenTo(User.search.failed, this.onFailed);
  },

  onCompleted(query, data, fromCache) {
    if (!fromCache) {
      data = this.trimData(data);
      setItem(JSON.stringify(query), data);
    }

    this.trigger({
      results: data,
      query
    });
  },

  onFailed(query, xhr) {
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
    data.items = map(data.items, item => {
      return pick(item, 'avatar_url', 'id', 'login');
    });
    return data;
  }
});
