import { Factory, faker } from 'ember-cli-mirage';

export default Factory.extend({
  sourceName() {
    let city = faker.address.city();

    if (faker.random.boolean()) {
      return faker.list.random("CrossFit")() + " " + city;
    } else {
      return city + " " + faker.list.random("CrossFit", "Fitness", "Gym")();
    }
  },

  name() {
    let separator = faker.list.random(" ", " - ", " | ")();
    let title = faker.list.random("WOD", "Workouts", "Workout of the Day")();

    if (faker.random.boolean()) {
      return this.sourceName + separator + title;
    } else {
      return title + separator + this.sourceName;
    }
  },

  url() {
    let domain = faker.internet.url();
    let path = [
      faker.internet.domainWord(),
      faker.internet.domainWord(),
      faker.internet.domainWord()
    ].join("/");

    return `${domain}/${path}`
  }
});
