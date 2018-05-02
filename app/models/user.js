import DS from "ember-data";

const { attr, hasMany } = DS;

export default DS.Model.extend({
  smsNumber: attr(),

  events: hasMany(),
});
