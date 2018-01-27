import Ember from "ember";
import Service, { inject as service } from "@ember/service";
import config from "../config/environment";
import { computed } from "@ember/object";

export default Service.extend({
  cookies: service(),
  store: service(),

  currentUser: null,
  isAuthenticated: computed.notEmpty("currentUser.id"),

  clearToken() {
    this.get("cookies").clear("token");
    this.set("currentUser", null);
  },

  setToken(token, expiresAt) {
    this.get("cookies").write("token", token, { expires: expiresAt });
    this.authenticate();
  },

  getToken() {
    return this.get("cookies").read("token");
  },

  init() {
    this._super(...arguments);

    if (this.getToken()) {
      this.authenticate();
    }
  },

  authenticate() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        method: "GET",
        url: config.APP.host + `/authenticate`,
        headers: {
          Authorization: "Bearer " + this.getToken(),
        },
        success: response => {
          let user = this.get("store").pushPayload(response);
          this.set("currentUser", user);
        },
        error: response => {
          let errors = response.responseJSON.errors.map(error => error.detail);
          this.clearToken();
          reject(errors);
        },
      });
    });
  },

  deleteSession() {
    return new Ember.RSVP.Promise(resolve => {
      let token = this.getToken();

      if (!token) {
        resolve();
        return;
      }

      Ember.$.ajax({
        method: "DELETE",
        url: config.APP.host + `/authenticate`,
        headers: {
          Authorization: "Bearer " + token,
        },
        success: () => {
          this.clearToken();
          resolve();
        },
        error: () => {
          this.clearToken();
          resolve();
        },
      });
    }, "Service 'authentication': requestCode");
  },

  requestCode(smsNumber) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.post({
        url: config.APP.host + `/authenticate/request-code`,
        data: { sms_number: smsNumber },
        success: () => resolve(),
        error: response => {
          let errors = response.responseJSON.errors.map(error => error.detail);
          reject(errors);
        },
      });
    }, "Service 'authentication': requestCode");
  },

  verifyCode(smsNumber, verificationCode) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.post({
        url: config.APP.host + `/authenticate`,
        data: {
          sms_number: smsNumber,
          verification_code: verificationCode,
        },
        success: response => {
          let session = this.get("store").pushPayload(response);
          this.setToken(session.get("token"), session.get("expiresAt"));
          resolve();
        },
        error: response => {
          let errors = response.responseJSON.errors.map(error => error.detail);
          reject(errors);
        },
      });
    }, "Service 'authentication': verifyCode");
  },
});
