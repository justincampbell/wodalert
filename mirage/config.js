export default function() {
  this.get('/feeds', (schema, request) => {
    return schema.feeds.all();
  });
}
