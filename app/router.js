import { scheduleOnce } from "@ember/runloop";
import { inject as service } from "@ember/service";
import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  metrics: service(),

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  _trackPage() {
    scheduleOnce("afterRender", this, () => {
      const page = this.get("url");
      const title = this.getWithDefault("currentRouteName", "unknown");

      this.get("metrics").trackPage({ page, title });
    });
  },
});

Router.map(function() {
  this.route("auth");

  this.route("users", function() {
    this.route("show", { path: "/:user_id" });
  });

  this.route("feeds", function() {
    this.route("new");
  });

  this.route("subscriptions", function() {
    this.route("new");
    this.route("show", { path: "/:subscription_id" });
  });
});

export default Router;
