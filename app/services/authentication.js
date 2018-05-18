import { isNotFoundError } from "ember-ajax/errors";
import { alias, equal, notEmpty } from "@ember/object/computed";
import { observer } from "@ember/object";
import Service, { inject as service } from "@ember/service";

export default Service.extend({
  ajax: service(),
  cookies: service(),
  store: service(),

  currentUser: null,
  token: null,

  isAdmin: alias("currentUser.admin"),
  isAuthenticated: notEmpty("currentUser.id"),
  isLoading: true,

  state: "signedOut",
  isSignedOut: equal("state", "signedOut"),
  isWaitingForSMSNumber: equal("state", "waitingForSMSNumber"),
  isWaitingForVerificationCode: equal("state", "waitingForVerificationCode"),
  isSigningIn: equal("state", "signingIn"),
  isSignedIn: equal("state", "signedIn"),

  init() {
    this._super(...arguments);

    let token = this.get("cookies").read("token");
    this.set("token", token);
    this.get("ajax").set("token", token);

    this.authenticate();

    this.get("isAuthenticated");
  },

  signedInObserver: observer("isAuthenticated", function() {
    if (this.get("isAuthenticated")) {
      this.set("state", "signedIn");
    } else {
      this.set("state", "signedOut");
    }
  }),

  setToken(token, expires) {
    this.set("token", token);
    this.get("cookies").write("token", token, { expires: expires });
    this.get("ajax").set("token", token);
  },

  clearToken() {
    this.set("token", null);
    this.set("currentUser", null);
    this.get("cookies").clear("token");
    this.get("ajax").set("token", null);
  },

  authenticate() {
    this.set("isLoading", true);

    let token = this.get("token");
    if (!token) {
      this.set("isLoading", false);
      return;
    }

    return this.get("ajax")
      .request("/authenticate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        let user = this.get("store").pushPayload(response);
        this.set("currentUser", user);
      })
      .catch(error => {
        if (isNotFoundError(error)) {
          this.clearToken();
          return;
        }
        throw error;
      })
      .finally(() => {
        this.set("isLoading", false);
      });
  },

  deleteSession() {
    this.set("isLoading", true);

    let token = this.get("token");

    return this.get("ajax")
      .delete("/authenticate", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .finally(() => {
        this.clearToken();
        this.set("isLoading", false);
        this.set("state", "signedOut");
      });
  },

  requestCode(smsNumber) {
    this.set("isLoading", true);

    return this.get("ajax")
      .post(`/authenticate/request-code`, {
        data: { sms_number: smsNumber },
        dataType: "text",
      })
      .finally(() => {
        this.set("isLoading", false);
      });
  },

  verifyCode(smsNumber, verificationCode) {
    this.set("isLoading", true);

    return this.get("ajax")
      .post(`/authenticate`, {
        data: {
          sms_number: smsNumber,
          verification_code: verificationCode,
        },
        dataType: "text",
      })
      .then(response => {
        let session = this.get("store").pushPayload(JSON.parse(response));

        let token = session.get("token");
        let expiresAt = session.get("expiresAt");

        this.setToken(token, expiresAt);
        this.set("isLoading", false);

        this.authenticate();
      });
  },
});
