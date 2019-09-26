var LaunchDarkly = require("launchdarkly-node-server-sdk");

// TODO: Pass user through server.js or middleware
const ldUser = {
  firstName: "AS",
  lastName: "DAF",
  key: "asdasdas@example.com",
  custom: {
    groups: "beta_testers"
  }
};

// These are global variables, kinda hacky
// but it keeps server.js clean
let ldflags = {};
let ldclient;

// Init LD middleware
// Defaults to 60 second interval, and default user
const init = async (ldkey, interval=60000, user=ldUser) => {
  // Initialize LaunchDarkly
    ldclient = LaunchDarkly.init(
    ldkey
  );

  // After Initialization
  ldclient.on("ready", async () => {
    await updateFlags(user)
  });

  // Set an update interval
  setTimeout(() => updateFlags(user), interval)
}

// Update flags from LaunchDarkly
const updateFlags = async user => {
  console.log("Updating flags");
  let state = await ldclient.allFlagsState(user);
  ldflags = state.allValues();
}

// request id middleware
const ldm = flagName => {
  return (req, res, next) => {
    req.flags = {
      ...req.flags,
      [flagName]: ldflags[flagName]
    };
    console.log(req.flags);
    next();
  };
};

module.exports = {ldm, init};
