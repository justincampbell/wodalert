import Controller from "@ember/controller";

export default Controller.extend({
  navIsActive: false,

  actions: {
    closeNav() {
      this.set("navIsActive", false);
    },

    toggleNav() {
      this.toggleProperty("navIsActive");
    }
  }
});
