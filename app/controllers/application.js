import { inject as service } from '@ember/service';
import Controller from "@ember/controller";

export default Controller.extend({
  authentication: service(),
  navIsActive: false,

  actions: {
    closeNav() {
      this.set("navIsActive", false);
    },

    toggleNav() {
      this.toggleProperty("navIsActive");
    },
  },
});
