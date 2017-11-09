import Service from '@ember/service';

export default Service.extend({
  feed: null,

  clearFeed() {
    this.set('feed', null);
  },

  pickFeed(feed) {
    this.set('feed', feed);
  }
});
