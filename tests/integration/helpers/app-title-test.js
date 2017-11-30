
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('app-title', 'helper:app-title', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{app-title}}`);

  assert.equal(this.$().text().trim(), 'Workout Alerts');
});

