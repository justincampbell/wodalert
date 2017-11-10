import DS from 'ember-data';
import { computed } from '@ember/object';

const { attr, belongsTo } = DS;

export default DS.Model.extend({
  feed: belongsTo('feed'),
  includeTitle: attr('boolean', { defaultValue: false }),
  shortenCommonTerms: attr('boolean', { defaultValue: true }),

  options: computed('includeTitle', 'shortenCommonTerms', function() {
    let result = {};

    if (this.get('includeTitle')) { result['include-title'] = true; }
    if (this.get('shortenCommonTerms')) { result['shorten-common-terms'] = true; }

    return result;
  }),
});
