/**
 * This is the main server script that provides the API endpoints
 * The script uses the database helper in /src
 * The endpoints retrieve, update, and return data to the page handlebars files
 */

// Utilities we need
const path = require("path");
const astra = require("./src/astra");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/" // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars")
  }
});

// Load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// Set up our poll options
const pollOptions = ["JavaScript", "HTML", "CSS"];

/**
 * Home route for the app
 *
 * Return the poll options from the database helper script
 * The home route may be called on remix in which case the db needs setup
 */
fastify.get("/", async function(request, reply) {
  const params = { seo: seo };
  // get our options
  params.options = await astra.getOptionCounts(pollOptions);
  console.log(params.options);
  reply.view("/src/pages/index.hbs", params);
});

// A POST route to handle and react to form submissions
fastify.post("/", async function(request, reply) {
  const params = { seo: seo };
  if (request.body.optionName) {
    params.picked = true;
    await astra.addOptionHistory(request.body.optionName);
  }
  params.options = await astra.getOptionCounts(pollOptions);
  params.optionNames = JSON.stringify(
    params.options.map(option => option.name)
  );
  params.optionCounts = JSON.stringify(
    params.options.map(option => option.count)
  );
  reply.view("/src/pages/index.hbs", params);
});

// Admin endpoint to get logs
fastify.get("/logs", async (request, reply) => {
  const params = { seo: seo };
  // get the poll history
  params.optionHistory = await astra.getOptionHistory();
  reply.view("/src/pages/admin.hbs", params);
});

// Admin endpoint to empty all logs - requires auth (instructions in README)
fastify.post("/clearlogs", async (request, reply) => {
  const params = { seo: seo };
  // Authenticate the user request by checking against the env key variable
  if (
    !request.body.key ||
    request.body.key.length < 1 ||
    request.body.key !== process.env.ADMIN_KEY ||
    !process.env.ADMIN_KEY
  ) {
    // Auth failed, return the log data plus a failed flag
    params.failed = true;
    // Send the log list
    params.optionHistory = await astra.getOptionHistory();
    reply.view("/src/pages/admin.hbs", params);
  } else {
    await astra.deleteOptionHistory();
    params.failed = null;
    reply.redirect("/");
  }
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function(err, address) {
  const params = { seo: seo };
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
});
