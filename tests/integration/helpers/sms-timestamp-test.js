
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sms-timestamp', 'helper:sms-timestamp', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{sms-timestamp}}`);

  assert.equal(this.$().text().trim(), '9:42 AM');
});

