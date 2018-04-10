import Controller from "@ember/controller";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default Controller.extend({
  authentication: service(),

  error: null,
  feedPicked: computed.bool("model.feed.id"),
  hasError: computed.notEmpty("error"),
  isLoading: false,
  isShowingOptions: false,

  actions: {
    toggleOptions() {
      this.toggleProperty("isShowingOptions");
    },

    signUp() {
      this.set("isLoading", true);

      const store = this.get("store");
      var feed = this.get("model.feed");

      var subscription = store.createRecord("subscription", {
        feed: feed,
      });

      subscription
        .save()
        .then(
          () => {
            this.transitionToRoute("subscriptions.show", subscription);
            this.set("error", null);
          },
          error => {
            if (error.isAdapterError) {
              this.set("error", error.errors[0].detail);
            } else {
              this.set("error", "Could not create subscription");
            }
          }
        )
        .finally(() => {
          this.set("isLoading", false);
        });
    },
  },
});
