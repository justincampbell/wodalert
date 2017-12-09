import Response from "ember-cli-mirage/response";
import { faker } from "ember-cli-mirage";

function head(status) {
  return new Response(status);
}

function error(status, title, detail) {
  return new Response(
    status,
    {},
    {
      errors: [
        {
          status: status,
          title: title,
          detail: detail,
        },
      ],
    }
  );
}

function extractToken(requestHeaders) {
  let authorizationHeader = requestHeaders.Authorization;
  let token = authorizationHeader.replace(/^Bearer\s/, "");
  return token;
}

export default function() {
  this.timing = 1000;

  this.get("/authenticate", ({ sessions }, { requestHeaders }) => {
    let token = extractToken(requestHeaders);
    let session = sessions.findBy({ token: token });

    if (session) {
      return session.user;
    } else {
      return error(404, "Not authenticated", "User not authenticated");
    }
  });

  this.delete("/authenticate", ({ sessions }, { requestHeaders }) => {
    let token = extractToken(requestHeaders);
    let session = sessions.findBy({ token: token });

    session.destroy();

    return head(204);
  });

  this.post("/authenticate", ({ sessions, users }, { requestBody }) => {
    let params = requestBody;

    let user = users.findBy({ smsNumber: params.sms_number });
    if (!user) {
      user = users.create({ smsNumber: params.sms_number });
    }

    let session = sessions.create({
      user: user,
      token: faker.random.uuid().replace(/-/g, ""),
      expiresAt: new Date(+new Date() + 1000 * 60 * 60 * 24 * 14), // 2 Weeks
    });

    return session;
  });

  this.post("/authenticate/request-code", () => {
    return head(202);
  });

  this.get("/feeds", (db, request) => {
    let query = request.queryParams["filter[query]"];

    if (!query) {
      return { data: [] };
    }

    return db.feeds
      .all()
      .filter(feed => {
        return feed.name.toLowerCase().includes(query.toLowerCase());
      })
      .slice(0, 10);
  });

  this.get("/feeds/:id");

  this.get("/feeds/:id/preview", (db, request) => {
    let id = request.params.id;
    let feed = db.feeds.find(id);

    let includeTitle = request.queryParams["include-title"];
    let shortenCommonTerms = request.queryParams["shorten-common-terms"];

    let preview = "";

    if (includeTitle) {
      preview = preview + feed.name + "\n";
    }

    if (shortenCommonTerms) {
      preview = preview + "DL 3-3-3\nThen...\n30 C&J for Time";
    } else {
      preview =
        preview + "Deadlift 3-3-3\nThen...\n30 Clean and Jerks for Time";
    }

    return { data: { attributes: { text: preview } } };
  });

  this.post("subscriptions");
  this.get("subscriptions/:id");
}
