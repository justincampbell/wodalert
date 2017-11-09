export default function() {
  this.get('/feeds', (schema, request) => {
    let query = request.queryParams['filter[query]'];

    if (!query) {
      return { data: [] };
    }

    return schema.feeds.all()
      .filter((feed) => {
        return feed.name.toLowerCase().includes(query.toLowerCase());
      })
      .slice(0, 10);
  });
}
