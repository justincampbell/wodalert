import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('sms-preview', 'Integration | Component | sms preview', {
  integration: true,
});

test('it renders', function(assert) {
  var model = {};
  this.set('model', model);
  this.render(hbs`{{sms-preview subscription=model}}`);

  assert.equal(
    this.$(`.message .timestamp`).text().trim(),
    '9:42 AM',
  );
});
