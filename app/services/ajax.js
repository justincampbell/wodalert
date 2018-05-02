import AjaxService from "ember-ajax/services/ajax";
import { computed } from "@ember/object";
import ENV from "wodalert/config/environment";

export default AjaxService.extend({
  host: ENV.APP.host,
  token: null,

  /**
   * headers are the default headers. These are overridden by headers passed
   * from a request method.
   */
  headers: computed("token", {
    get() {
      let headers = {};

      let token = this.get("token");
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      return headers;
    },
  }),
});
