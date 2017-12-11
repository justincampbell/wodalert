import ApplicationAdapter from "./application";

export default ApplicationAdapter.extend({
  preview(model) {
    const url = this.buildURL() + "/preview";
    return this.ajax(url, "POST", { data: model.serialize() });
  },
});
