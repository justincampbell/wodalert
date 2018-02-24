import Controller from "@ember/controller";
import { inject as service } from "@ember/service";
import { computed } from "@ember/object";

export default Controller.extend({
  authentication: service(),

  isAuthenticated: computed.alias("authentication.isAuthenticated"),

  actions: {
    setKind(kind) {
      this.set("model.kind", kind);
    },

    submit() {
      const flash = this.get("flashMessages");

      this.set("isLoading", true);

      this.get("model")
        .save()
        .then(
          response => {
            let name = response.data.name;
            let kind = response.data.kind.toUpperCase();
            flash.success(
              `Added ${name} ${kind} feed. ` +
                `You can now subscribe to it for daily texts.`
            );
            this.transitionToRoute("subscriptions.new");
          },
          error => {
            if (error.isAdapterError) {
              flash.danger(error.errors[0].detail);
            } else {
              flash.danger("Could not create feed");
            }
          }
        )
        .finally(() => {
          this.set("isLoading", false);
        });
    }
  }
});
