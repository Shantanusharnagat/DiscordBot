const path = require("path");
const astra = require("./src/astra");

// Require the fastify framework and instantiate it
const fastify = require("fastify")({
  // set this to true for detailed logging:
  logger: false,
});

// Setup our static files
fastify.register(require("fastify-static"), {
  root: path.join(__dirname, "public"),
  prefix: "/", // optional: default '/'
});

// fastify-formbody lets us parse incoming forms
fastify.register(require("fastify-formbody"));

// point-of-view is a templating manager for fastify
fastify.register(require("point-of-view"), {
  engine: {
    handlebars: require("handlebars"),
  },
});

// load and parse SEO data
const seo = require("./src/seo.json");
if (seo.url === "glitch-default") {
  seo.url = `https://${process.env.PROJECT_DOMAIN}.glitch.me`;
}

// Our home page route, this pulls from src/pages/index.hbs
fastify.get("/", async function (request, reply) {
  // params is an object we'll pass to our handlebars template
  let params = { seo: seo };
  // check and see if someone asked for a random color
  if (request.query.randomize) {
    // we need to load our color data file, pick one at random, and add it to the params
    const colors = require("./src/colors.json");
    const allColors = Object.keys(colors);
    let currentColor = allColors[(allColors.length * Math.random()) << 0];
    params = {
      color: colors[currentColor],
      colorError: null,
      seo: seo,
    };
    // save a color history entry to astra
    await astra.addOptionHistory({
      name: currentColor
    });
  }
  reply.view("/src/pages/index.hbs", params);
});

// A POST route to handle and react to form submissions
fastify.post("/", async function (request, reply) {
  let params = { seo: seo };
  // the request.body.color is posted with a form submission
  let color = request.body.color;
  // if it's not empty, let's try to find the color
  if (color) {
    // load our color data file
    const colors = require("./src/colors.json");
    // take our form submission, remove whitespace, and convert to lowercase
    color = color.toLowerCase().replace(/\s/g, "");
    // now we see if that color is a key in our colors object
    if (colors[color]) {
      // found one!
      // save a color history entry to astra
      await astra.addOptionHistory({
        name: color
      });
      params = {
        color: colors[color],
        colorError: null,
        seo: seo,
        optionHistory: await astra.getOptionHistory(),
      };
    } else {
      // try again.
      params = {
        colorError: request.body.color,
        seo: seo,
        optionHistory: await astra.getOptionHistory(),
      };
    }
  }
  reply.view("/src/pages/index.hbs", params);
});

// A GET route to handle clearing color history
fastify.get("/delete-option-history", async function (request, reply) {
  await astra.deleteOptionHistory();
  reply.redirect("/");
});

// Admin endpoint to get logs
fastify.get("/logs", async (request, reply) => {
  let params = {};
  // get the poll history
  params.optionHistory = await astra.getOptionHistory();
  reply.view("/src/pages/admin.hbs", params);
});

// Admin endpoint to empty all logs - requires auth (instructions in README)
fastify.post("/clearLogs", (request, reply) => {
  let params = {};
  // Authenticate the user request by checking against the env key variable
  if (!request.body.key || request.body.key.length<1 || request.body.key !== process.env.ADMIN_KEY) {
    // Auth failed, return the log data plus a failed flag
    let params = {};
    params.failed = true;
    // Send the log list 
    
  } else {
    // We have a valid key and can clear the log
    
  }
});

// Run the server and report out to the logs
fastify.listen(process.env.PORT, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log(`Your app is listening on ${address}`);
  fastify.log.info(`server listening on ${address}`);
});
