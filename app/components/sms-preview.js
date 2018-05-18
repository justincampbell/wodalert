import { isNotFoundError } from "ember-ajax/errors";
import { computed, observer } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  init() {
    this._super(...arguments);
    this.updatePreview();
  },

  store: service(),

  subscription: null,
  feed: computed.oneWay("subscription.feed"),

  preview: null,
  error: null,

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
      this.set("error", null);

      this.get("subscription")
        .preview()
        .then(preview => {
          this.set("preview", preview.data.attributes.text);
        })
        .catch(error => {
          if (isNotFoundError(error)) {
            this.set("error", "We don't have any posts for that feed :(");
            this.set("preview", null);
            return;
          }
          throw error;
        })
        .finally(() => {
          this.set("loading", false);
        });
    }
  ),
});
