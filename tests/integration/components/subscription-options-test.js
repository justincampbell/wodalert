import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('subscription-options', 'Integration | Component | subscription options', {
  integration: true
});

test('it renders', function(assert) {
  var model = { };
  this.set('model', model);

  this.render(hbs`{{subscription-options subscription=model}}`);

  assert.equal(this.$(`article input`).length, 2);
});
