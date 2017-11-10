import DS from 'ember-data';

export default DS.Model.extend({
  feed: DS.belongsTo('feed'),
  includeTitle: DS.attr('boolean', { defaultValue: false }),
  shortenCommonTerms: DS.attr('boolean', { defaultValue: true }),
});
