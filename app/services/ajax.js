import AjaxService from "ember-ajax/services/ajax";
import { computed } from "@ember/object";

export default AjaxService.extend({
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
