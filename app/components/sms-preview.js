import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  subscription: null,
  feed: computed.alias('subscription.feed'),

  preview: computed('feed', function() {
    if (!this.get('feed')) {
      return "No feed";
    }

    return `
          BS 3-3-3<br>
          Then...<br>
          5 rounds:<br>
          30-15-9<br>
          30 DU<br>
          15 KB Swings<br>
          9 OHS<br><br>
          <a href="http://bit.ly/abc123">http://bit.ly/abc123</a>`;
  }),
});
