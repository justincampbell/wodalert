import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  newSubscription: service(),

  results: [],

  actions: {
    search(query) {
      let store = this.get('store');
      let results = store.query('feed', {
        filter: { query: query }
      });

      this.set('results', results);
    },

    clearFeed() {
      this.get('newSubscription').clearFeed();
    },

    pickFeed(feed) {
      this.get('newSubscription').pickFeed(feed);
    }
  },
});
