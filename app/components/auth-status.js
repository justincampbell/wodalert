import Component from "@ember/component";
import { computed, observer } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  // TODO: Button title represents current state, pass default (sign in vs confirm)
  // TODO:

  authentication: service(),

  isAuthenticated: computed.alias("authentication.isAuthenticated"),
  currentUser: computed.alias("authentication.currentUser"),

  color: "success",
  size: "medium",
  buttonText: "Sign In",
  state: "signedOut",

  isSignedOut: computed.equal("state", "signedOut"),
  isWaitingForSMSNumber: computed.equal("state", "waitingForSMSNumber"),
  isWaitingForVerificationCode: computed.equal(
    "state",
    "waitingForVerificationCode"
  ),
  isSigningIn: computed.equal("state", "signingIn"),
  isSignedIn: computed.equal("state", "signedIn"),

  init() {
    this._super(...arguments);

    // We have to get this during init for the observer to work.
    this.get("isAuthenticated");
  },

  signedInObserver: observer("isAuthenticated", function() {
    if (this.get("isAuthenticated")) {
      this.set("state", "signedIn");
    } else {
      this.set("state", "signedOut");
    }
  }),

  actions: {
    signIn() {
      this.set("state", "waitingForSMSNumber");
    },

    signOut() {
      this.set("isLoading", true);

      this.get("authentication")
        .deleteSession()
        .finally(this.set("isLoading", false));
    },

    requestCode() {
      this.set("isLoading", true);

      this.get("authentication")
        .requestCode(this.get("smsNumber"))
        .then(
          () => {
            this.set("state", "waitingForVerificationCode");
          },
          error => {
            console.log(error);
          }
        )
        .finally(() => {
          this.set("isLoading", false);
        });
    },

    verifyCode() {
      this.set("isLoading", true);

      this.get("authentication")
        .verifyCode(this.get("smsNumber"), this.get("verificationCode"))
        .then(
          () => {
            this.set("state", "signingIn");
          },
          error => {
            console.log(error);
          }
        )
        .finally(() => {
          this.set("isLoading", false);
        });
    },
  },
});
