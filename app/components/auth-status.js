import { computed, observer } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  // TODO: Button title represents current state, pass default (sign in vs confirm)
  // TODO:

  authentication: service(),
  flashMessages: service(),

  isAuthenticated: computed.alias("authentication.isAuthenticated"),
  currentUser: computed.alias("authentication.currentUser"),
  isLoading: computed.alias("authentication.isLoading"),

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
      this.get("authentication")
        .deleteSession()
        .finally(() => {
          this.set("state", "signedOut");
        });
    },

    requestCode() {
      const flash = this.get("flashMessages");
      let smsNumber = this.get("smsNumber");

      this.get("authentication")
        .requestCode(smsNumber)
        .then(() => {
          this.set("state", "waitingForVerificationCode");
          flash.info(`Verification code sent to ${smsNumber}`);
        })
        .catch(({ payload }) => {
          payload.errors.forEach(error => {
            flash.danger(error.detail);
          });
        });
    },

    verifyCode() {
      const flash = this.get("flashMessages");
      let smsNumber = this.get("smsNumber");
      let verificationCode = this.get("verificationCode");

      this.get("authentication")
        .verifyCode(smsNumber, verificationCode)
        .then(() => {
          this.set("state", "signingIn");
          flash.success("SMS number verified");
        })
        .catch(({ payload }) => {
          payload.errors.forEach(error => {
            flash.danger(error.detail);
          });
        });
    },
  },
});
