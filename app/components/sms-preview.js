import Component from '@ember/component';
import { computed, observer } from '@ember/object';
import { inject as service } from "@ember/service";

export default Component.extend({
  store: service(),

  subscription: null,
  feed: computed.alias('subscription.feed'),
  subscriptionOptions: computed.alias('subscription.options'),

  preview: null,

  updatePreview: observer('feed', 'subscriptionOptions', function() {
    this.get('feed').then((feed) => {
      if (!feed) {
        return this.set('preview', null);
      }

      let subscriptionOptions = this.get('subscriptionOptions');

      feed.preview(subscriptionOptions).then((preview) => {
        this.set('preview', preview.text);
      });
    });
  }),
});
