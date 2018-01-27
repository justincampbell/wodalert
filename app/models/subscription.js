import DS from "ember-data";
import Ember from "ember";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  feed: belongsTo("feed"),
  includeFeedName: attr("boolean", { defaultValue: false }),
  includeTitle: attr("boolean", { defaultValue: true }),
  includeLink: attr("boolean", { defaultValue: true }),
  shortenCommonTerms: attr("boolean", { defaultValue: true }),

  preview() {
    // TODO: Do this the correct way.
    if (!this.serialize().data.relationships.feed.data) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        reject();
      });
    }

    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.preview(this);
  },
});
