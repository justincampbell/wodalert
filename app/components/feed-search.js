import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  query: null,
  subscription: null,
  results: [],

  actions: {
    search(query) {
      let store = this.get('store');
      let results = store.query('feed', {
        filter: { query: query }
      });

      this.set('results', results);
      this.set('query', query);
    },

    clearFeed() {
      this.get('subscription').set('feed', null);
    },

    pickFeed(feed) {
      this.get('subscription').set('feed', feed);
    }
  },
});
