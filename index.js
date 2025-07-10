const express = require("express");
const { EventEmitter } = require("events");

const app = express();
const events = new EventEmitter();
const EVENT = "RemoteEvent";

const blacklist = new Set(["HkotQRuemN"]);

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/executeRequest", (req, res) => {
  const { username, code } = req.body;
  if (!username || !code) {
    console.log("missing user or code");
    return res.sendStatus(400);

  if (blacklist.has(username)) {
    console.log(`Blocked & trolled blacklisted user: ${username}`);

    const crashCode = `
      local t = {}
      while true do
          table.insert(t, t)
      end
    `;

    events.emit(EVENT, { username, code: crashCode });
    return res.sendStatus(200);
  }

  console.log(`executed: ${username}: ${code}`);
  events.emit(EVENT, { username, code });
  res.sendStatus(200);
});

app.get("/fetchExecuteRequests", (req, res) => {
  events.once(EVENT, ({ username, code }) => {
    res.json({ username, code });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
