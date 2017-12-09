export default function(server) {
  server.create("user", { smsNumber: "1234567890" });

  server.createList("feed", 100);
}
