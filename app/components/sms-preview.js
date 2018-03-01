import Component from "@ember/component";
import { computed, observer } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  init() {
    this._super(...arguments);
    this.updatePreview();
  },

  store: service(),

  subscription: null,
  feed: computed.oneWay("subscription.feed"),

  preview: null,

  displayPreview: computed.and("preview", "feed"),

  updatePreview: observer(
    "feed.id",
    "subscription.characterLimit",
    "subscription.includeFeedName",
    "subscription.includeTitle",
    "subscription.includeLink",
    "subscription.shortenCommonTerms",
    function() {
      this.set("loading", true);
      this.get("subscription")
        .preview()
        .then(preview => {
          this.set("loading", false);
          this.set("preview", preview.data.attributes.text);
        });
    }
  )
});
