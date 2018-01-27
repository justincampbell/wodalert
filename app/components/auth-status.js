import Component from "@ember/component";
import { computed, observer } from "@ember/object";
import { inject as service } from "@ember/service";

export default Component.extend({
  // TODO: Button title represents current state, pass default (sign in vs confirm)
  // TODO:

  authentication: service(),
  flashMessages: service(),

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

    this.get("authentication").authenticate();
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
        .finally(() => {
          this.set("isLoading", false);
          this.set("state", "signedOut");
        });
    },

    requestCode() {
      const flash = this.get("flashMessages");

      this.set("isLoading", true);

      this.get("authentication")
        .requestCode(this.get("smsNumber"))
        .then(
          () => {
            this.set("state", "waitingForVerificationCode");
            flash.info("Verification code sent to " + this.get("smsNumber"));
          },
          errors => {
            errors.forEach(error => {
              flash.danger(error);
            });
          }
        )
        .finally(() => {
          this.set("isLoading", false);
        });
    },

    verifyCode() {
      const flash = this.get("flashMessages");

      this.set("isLoading", true);

      this.get("authentication")
        .verifyCode(this.get("smsNumber"), this.get("verificationCode"))
        .then(
          () => {
            this.set("state", "signingIn");
            flash.success("SMS number verified");
          },
          errors => {
            errors.forEach(error => {
              flash.danger(error);
            });
          }
        )
        .finally(() => {
          this.set("isLoading", false);
        });
    },
  },
});
