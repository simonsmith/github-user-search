import Reflux from 'reflux';
import User from 'actions/user';
import pick from 'lodash-node/modern/objects/pick';
import map from 'lodash-node/modern/collections/map';
import { setItem } from 'mixins/cache';
import parseLinkHeader from 'utils/parseLinkHeader';

export default Reflux.createStore({
  init() {
    this.listenTo(User.search.completed, this.onSearchCompleted);
    this.listenTo(User.search.failed, this.onSearchFailed);
  },

  onSearchCompleted(response, fromCache) {
    if (!fromCache) {
      // Only take data that's needed
      let results = pick(response.data, 'items', 'total_count');
      results.items = map(response.data.items, item => pick(item, 'avatar_url', 'id', 'login'));

      // Construct data to cache
      let data = {
        results,
        url: response.url,
        pagination: parseLinkHeader(response.xhr.getResponseHeader('Link') || '')
      };

      // Cache it
      setItem(data.url, data);

      // Notify the views
      this.trigger(data);
    } else {
      // Data came from cache, so send straight to views
      this.trigger(response);
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
