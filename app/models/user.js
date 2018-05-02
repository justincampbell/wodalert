import DS from "ember-data";

const { attr, hasMany } = DS;

export default DS.Model.extend({
  events: hasMany(),

  admin: attr(),
  smsNumber: attr(),
});
