import Component from "@ember/component";
import { computed } from "@ember/object";

export default Component.extend({
  subscription: null,

  showAdvancedOptions: false,

  messageLimit: computed("subscription.characterLimit", function() {
    return this.get("subscription.characterLimit") / 160;
  }),

  actions: {
    incrementCharacterLimit(by) {
      this.get("subscription").incrementCharacterLimit(by);
    },

    toggleAdvancedOptions() {
      this.toggleProperty("showAdvancedOptions");
    }
  }
});
