import loadInitializers from "ember-load-initializers";
import Application from "@ember/application";
import Ember from "ember";
import Resolver from "./resolver";
import config from "./config/environment";

Ember.LinkComponent.reopen({
  activeClass: "is-active",
});

const App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,
});

loadInitializers(App, config.modulePrefix);

export default App;
