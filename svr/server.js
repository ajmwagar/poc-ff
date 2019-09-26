const express = require("express");
const UserController = require("./routes/users/index");
const {ldm, init} = require("./middleware/ld");

const app = express();
const port = 3001;

// 5 Minute updateInterval
const updateInterval = 5 * 60000;
// LaunchDarkly SDK key
const ldKey= "sdk-6203c9da-4d89-474d-9dc0-4c01345eb30b";

// Update LaunchDarkly Flags every 5 minutes
init(ldKey, updateInterval);

app.use(express.json());
app.use(ldm("user-details"));
app.use(ldm("wrap-presentation-player"));

app.get("/", (req, res) => res.send("Hello World!"));
app.use(UserController);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
