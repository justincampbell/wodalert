import { alias } from "@ember/object/computed";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  // TODO: Button title represents current state, pass default (sign in vs confirm)
  // TODO:

  authentication: service(),

  isLoading: computed.alias("authentication.isLoading"),

  color: "success",
  size: "medium",
  buttonText: "Sign In",

  isSignedOut: alias("authentication.isSignedOut"),
  isSignedIn: alias("authentication.isSignedIn"),

  actions: {
    signIn() {
      this.set("authentication.state", "waitingForSMSNumber");
    },

    signOut() {
      this.get("authentication").deleteSession();
    },
  },
});
