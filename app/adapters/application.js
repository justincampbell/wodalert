import DS from "ember-data";
import config from "../config/environment";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default DS.JSONAPIAdapter.extend({
  host: config.APP.host,

  authentication: service(),

  headers: computed("authentication.isAuthenticated", function() {
    let headers = {};

    let token = this.get("authentication").getToken();
    if (token) {
      headers.Authorization = "Bearer " + token;
    }

    return headers;
  }),
});
