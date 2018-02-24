import DS from "ember-data";
import Ember from "ember";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  feed: belongsTo("feed"),
  characterLimit: attr("number", { defaultValue: 480 }),
  includeFeedName: attr("boolean", { defaultValue: false }),
  includeTitle: attr("boolean", { defaultValue: true }),
  includeLink: attr("boolean", { defaultValue: true }),
  shortenCommonTerms: attr("boolean", { defaultValue: true }),

  incrementCharacterLimit(by) {
    this.incrementProperty("characterLimit", by);
    const clamp = function(value, min, max) {
      return Math.min(Math.max(value, min), max);
    };
    this.set("characterLimit", clamp(this.get("characterLimit"), 160, 1600));
  },

  preview() {
    // TODO: Do this the correct way.
    if (!this.serialize().data.relationships.feed.data) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        reject();
      });
    }

    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.preview(this);
  }
});
