import DS from "ember-data";
import { computed } from "@ember/object";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  feed: belongsTo("feed"),
  includeTitle: attr("boolean", { defaultValue: false }),
  shortenCommonTerms: attr("boolean", { defaultValue: true }),

  preview() {
    const adapter = this.store.adapterFor(this.constructor.modelName);
    return adapter.preview(this);
  },
});
