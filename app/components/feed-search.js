import Component from '@ember/component';

export default Component.extend({
  actions: {
    search(value) {
      console.log(value);
    }
  }
});
