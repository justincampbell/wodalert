import Controller from "@ember/controller";

export default Controller.extend({
  navIsActive: false,

  actions: {
    toggleNav() {
      this.toggleProperty("navIsActive");
    }
  }
});
