import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  confirmedSubscriptionOptions: false,

  subscriptionOptionsVisible: computed('confirmedSubscriptionOptions', 'model.feed', function() {
    if (this.get('confirmedSubscriptionOptions')) {
      return false;
    }

    if (!this.get('model.feed')) {
      return true;
    }

    return false
  }),

  actions: {
    confirmSubscriptionOptions() {
      this.set('confirmedSubscriptionOptions', true);
    },
  },
});
