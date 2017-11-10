export default function() {
  this.timing = 75;

  this.get('/feeds', (db, request) => {
    let query = request.queryParams['filter[query]'];

    if (!query) {
      return { data: [] };
    }

    return db.feeds.all()
      .filter((feed) => {
        return feed.name.toLowerCase().includes(query.toLowerCase());
      })
      .slice(0, 10);
  });

  this.get('/feeds/:id');

  this.get('/feeds/:id/preview', (db, request) => {
    let id = request.params.id;
    let feed = db.feeds.find(id);

    let includeTitle = request.queryParams['include-title'];
    let shortenCommonTerms = request.queryParams['shorten-common-terms'];

    let preview = "";

    if (includeTitle) {
      preview = preview + feed.name + "\n";
    }

    if (shortenCommonTerms) {
      preview = preview + "DL 3-3-3\nThen...\n30 C&J for Time";
    } else {
      preview = preview + "Deadlift 3-3-3\nThen...\n30 Clean and Jerks for Time";
    }

    return  { text: preview };
  });

}
