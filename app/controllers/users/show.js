import { sort } from "@ember/object/computed";
import Controller from "@ember/controller";

export default Controller.extend({
  events: sort("model.events", "eventSorting"),
  eventSorting: ["createdAt:desc"],
});
