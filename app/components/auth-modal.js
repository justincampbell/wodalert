import { alias } from "@ember/object/computed";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import Component from "@ember/component";

export default Component.extend({
  authentication: service(),
  flashMessages: service(),

  isLoading: computed.alias("authentication.isLoading"),
  isWaitingForSMSNumber: alias("authentication.isWaitingForSMSNumber"),
  isWaitingForVerificationCode: alias(
    "authentication.isWaitingForVerificationCode"
  ),

  actions: {
    cancel() {
      this.set("authentication.state", "signedOut");
    },

    requestCode() {
      const flash = this.get("flashMessages");
      let smsNumber = this.get("smsNumber");

      this.get("authentication")
        .requestCode(smsNumber)
        .then(() => {
          this.set("authentication.state", "waitingForVerificationCode");
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
          this.set("authentication.state", "signingIn");
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
