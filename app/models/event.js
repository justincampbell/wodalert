import DS from "ember-data";

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  user: belongsTo(),

  createdAt: attr(),
  code: attr(),
  detail: attr(),

  // TODO: data is a reserved function on an ember-data model
  // data: attr()
});
