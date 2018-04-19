import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  store: service(),

  query: null,
  subscription: null,
  results: [],

  actions: {
    search(query) {
      this.set("isLoading", true);

      let store = this.get("store");
      let results = store.query("feed", {
        filter: { query: query },
      });

      results.then(() => {
        this.set("isLoading", false);
      });

      this.set("results", results);
      this.set("query", query);
    },

    clearFeed() {
      this.get("subscription").set("feed", null);
    },

    pickFeed(feed) {
      this.get("subscription").set("feed", feed);
    },
  },
});
