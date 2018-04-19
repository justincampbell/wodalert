import DS from "ember-data";
import { computed } from "@ember/object";
import { inject as service } from "@ember/service";

export default DS.JSONAPIAdapter.extend({
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
