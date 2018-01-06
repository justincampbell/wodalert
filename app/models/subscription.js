import DS from "ember-data";
import Ember from "ember";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  feed: belongsTo("feed"),
  includeTitle: attr("boolean", { defaultValue: false }),
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
