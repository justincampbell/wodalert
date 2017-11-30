import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('feed-search', 'Integration | Component | feed search', {
  integration: true
});

test('it renders', function(assert) {
  var model = {};
  this.set('model', model);
  this.render(hbs`{{feed-search subscription=model}}`);

  assert.equal(this.$(`input`).length, 3);
});
