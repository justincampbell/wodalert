import DS from "ember-data";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";
import ENV from "wodalert/config/environment";

export default DS.JSONAPIAdapter.extend({
  host: ENV.APP.host,
  authentication: service(),

  headers: computed("authentication.isAuthenticated", function() {
    let headers = {};

    let token = this.get("authentication").get("token");
    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    return headers;
  }),
});
