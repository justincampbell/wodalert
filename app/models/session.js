import DS from "ember-data";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  user: belongsTo(),

  token: attr(),
  expiresAt: attr("date"),
});
