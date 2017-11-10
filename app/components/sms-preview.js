import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { inject as service } from "@ember/service";

export default Component.extend({
  store: service(),

  subscription: null,
  feed: computed.oneWay('subscription.feed'),
  subscriptionOptions: computed.oneWay('subscription.options'),

  preview: null,

  displayPreview: computed.and('preview', 'feed'),

  updatePreview: observer('feed', 'subscriptionOptions', function() {
    if (!this.get('feed.id')) {
      this.set('preview', null);
      return;
    }

    this.get('feed').then((feed) => {
      let subscriptionOptions = this.get('subscriptionOptions');

      feed.preview(subscriptionOptions).then((preview) => {
        this.set('preview', preview.text);
      });
    });
  }),
});
