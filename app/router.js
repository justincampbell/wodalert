import EmberRouter from "@ember/routing/router";
import config from "./config/environment";

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
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
