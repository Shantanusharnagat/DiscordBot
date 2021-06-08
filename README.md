# Hello Astra!

This project includes a [Node.js](https://nodejs.org/en/about/) server script that uses a serverless [DataStax Astra](https://astra.datastax.com) database. The app also includes a front-end with two web pages that connect to the database using the server API. 📊

The home page presents the user with a poll where they can choose an option, then the page presents the results in a chart. The admin page displays the log of past choices and allows the user to clear it by supplying their admin key (you can set this up next). 🔒

    

## Prerequisites

To get best use out of this project you'll ideally be familiar with JavaScript and have a little Node.js experience–check out [Hello Node](https://glitch.com/~glitch-hello-node) if you haven't already!

## Setting up your Astra data

✏️ When you remix this project you'll need to provide your own Astra credentials and setup the database:

* [Sign up /into a DataStax Astra account](https://astra.datastax.com/register?utm_source=github&utm_medium=referral&utm_campaign=astra-glitch-react-express-starter).
* Click __Create Database__ &gt; __Get Started__.

![Database setup](https://cdn.glitch.com/f3419efa-7e65-4968-8b15-1e151feaf4c5%2Fastra-db-setup.jpg?v=1623150868127)

* Enter your new database details:
  * __Database Name__ `Preferences`
  * __Keyspace Name__ `Coding`
  * Select a provider and region
  * Click __Create Database__

![Astra active](https://cdn.glitch.com/f3419efa-7e65-4968-8b15-1e151feaf4c5%2Fastra-active.jpg?v=1623150956335)

* Once your database __Status__ changes to `Active` it's ready to use!

Connect your Astra data to your Glitch app:

![Astra ID](https://cdn.glitch.com/f3419efa-7e65-4968-8b15-1e151feaf4c5%2Fastra-id.jpg?v=1623151174035)

* With your database selected, click __Connect__. Copy the `ASTRA_DB_ID` and region values, pasting them into your Glitch app `.env` as the corresponding variable values.

![Astra user](https://cdn.glitch.com/f3419efa-7e65-4968-8b15-1e151feaf4c5%2Fastra-user-setup.jpg?v=1623158490110)

* Back in Astra, click the dropdown with your username displayed at the top left to access the __Organization Settings__.
* Select __Token Management__ and choose __Admin User__ from the dropdown list.
* Click __Generate Token__ and copy the `Token` value–paste it into the Glitch `.env` as the `ASTRA_DB_APPLICATION_TOKEN` variable, and add your keyspace `Coding` for the other Astra variable.

Your database should be good to go and the app homepage should now present a poll with three options!

_You can also use the [GitHub Astra Starter Repository](https://github.com/DataStax-Examples/glitch-astra-starter) which includes instructions for running locally._

## What's in this project?

← `README.md`: That’s this file, where you can tell people what your cool website does and how you built it.

← `package.json`: The NPM packages for your project's dependencies.

← `.env`: The environment is cleared when you initially remix the project, but you will add new env variable values when you follow the setup steps.

### Server and database

← `server.js`: The Node.js server script for your new site. The JavaScript defines the endpoints in the site API. The API processes requests, connects to the database using the `astra` script in `src`, and sends info back to the client (the web pages that make up the app user interface, built using the Handlebars templates in `src/pages`).

← `/src/astra.js`: The database script handles setting up and connecting to the Astra database. The `server.js` API endpoints call the functions in the database script to manage the data.

### User interface

← `public/style.css`: The style rules that define the site appearance.

← `src/pages`: The handlebars files that make up the site user interface. The API in `server.js` sends data to these templates to include in the HTML.

← `src/pages/index.hbs`: The site homepage presents a form when the user first visits. When the visitor submits a preference through the form, the app calls the `POST` endpoint `/`, passing the user selection. The `server.js` endpoint updates the database and returns the user choices submitted so far, which the page presents in a chart (using [Chart.js](https://www.chartjs.org/docs/)–you can see the code in the page `head`);

← `src/pages/admin.hbs`: The admin page presents a table displaying the log of most recent picks. You can clear the list by setting up your admin key in __Next steps__ below. If the user attempts to clear the list without a valid key, the page will present the log again.

← `src/seo.json`: When you're ready to share your new site or add a custom domain, change SEO/meta settings in here.


## Setting up admin

The site __Admin__ page allows the user to clear the database log of picks–but only if a valid key is provided. This is a simplified example of auth that checks if the user entered key matches the one in the `.env`.

To set your app up to allow clearing the log:

* In your `.env` file, find the variable named `ADMIN_KEY` and give it a text string as a value.
* With the __Admin__ page open in the preview, enter the same value and hit the __Clear log history__ button–this time it should allow you to clear the log.

See the `clearLogs` endpoint in `server.js` to learn how this works.

![Glitch](https://cdn.glitch.com/a9975ea6-8949-4bab-addb-8a95021dc2da%2FLogo_Color.svg?v=1602781328576)

## You built this with Glitch!

[Glitch](https://glitch.com) is a friendly community where millions of people come together to build web apps and websites.

- Need more help? [Check out our Help Center](https://help.glitch.com/) for answers to any common questions.
- Ready to make it official? [Become a paid Glitch member](https://glitch.com/pricing) to boost your app with private sharing, more storage and memory, domains and more.
