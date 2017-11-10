import DS from 'ember-data';
import { memberAction } from 'ember-api-actions';

const { attr } = DS;

export default DS.Model.extend({
  name: attr(),
  url: attr(),
  preview: memberAction({ type: 'GET', path: 'preview' }),
});
