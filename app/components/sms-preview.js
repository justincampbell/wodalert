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
    "subscription.includeFeedName",
    "subscription.includeTitle",
    "subscription.includeLink",
    "subscription.shortenCommonTerms",
    function() {
      this.get("subscription")
        .preview()
        .then(preview => {
          this.set("preview", preview.data.attributes.text);
        });
    }
  ),
});
