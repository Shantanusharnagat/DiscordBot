const { createClient } = require("@astrajs/collections");

// Sets a top-level astraClient variable for us to reference
let astraClient = null;

// Retrieves the main Astra Collections Client API object
const getAstraClient = async () => {
  if (astraClient === null) {
    // Wrap the connection in a try, letting us know if it fails
    // If it does, it's probably because we're in a fresh remix
    try {
      astraClient = await createClient(
        {
          astraDatabaseId: process.env.ASTRA_DB_ID,
          astraDatabaseRegion: process.env.ASTRA_DB_REGION,
          applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN
        },
        30000
      );
    } catch (e) {
      // Return null to indicate we couldn't connect
      astraClient = null;
    }
  }
  return astraClient;
};

// Gets a collection object, used by most of the exported functions
const getCollection = async collectionName => {
  try {
    const documentClient = await getAstraClient();
    return documentClient
      .namespace(process.env.ASTRA_DB_KEYSPACE)
      .collection(collectionName);
  } catch (e) {
    //console.error(e);
    return null;
  }
};

// These are the functions we can call when is required in server.js
module.exports = {
  // Creates a log entry for the chosen option
  addOptionHistory: async option => {
    const log = await getCollection("pollOptions");
    await log.create({
      name: option,
      timestamp: Date.now()
    });
    await module.exports.incrementOption(option);
  },

  // The database stores a total count for each option, this increments it
  incrementOption: async option => {
    const countCollection = await getCollection("pollCounts");
    const currentCount = await module.exports.getOptionCount(option);
    try {
      await countCollection.update(option, {
        count: currentCount.count + 1
      });
    } catch (e) {
      console.error(e);
    }
  },

  // This gets the count for a single option
  getOptionCount: async (option, collection) => {
    const optionCount = {
      name: option,
      count: 0
    };
    try {
      const results = await collection.get(option);
      if (results) {
        optionCount.count = results.count || 0;
      } else {
        // we didn't find anything, so let's create a record for next time
        const newOption = await collection.create(option, optionCount);
        if (!newOption) {
          console.error("could not create option count row in DB");
        }
      }
    } catch (e) {
      console.error(e);
    }
    return optionCount;
  },

  // This bundles up an array for all our totals
  getOptionCounts: async options => {
    const countCollection = await getCollection("pollCounts");
    if (countCollection === null) {
      // there was an error getting the collection, likely improper setup
      return null;
    } else {
      /*
      const optionCounts = [];
      for (const option of options) {
        optionCounts.push(await module.exports.getOptionCount(option, countCollection));
      }

      return optionCounts;
      */
    }
  },

  getOptionHistory: async () => {
    const logCollection = await getCollection("pollOptions");
    try {
      const log = await logCollection.find();
      return Object.keys(log).map(itemId => ({
        id: itemId,
        name: log[itemId].name,
        timestamp: new Date(log[itemId].timestamp).toString()
      }));
    } catch (e) {
      //console.error(e);
      return [];;
    }
  },

  deleteOptionHistory: async () => {
    const base = `/api/rest/v2/schemas/keyspaces/${process.env.ASTRA_DB_KEYSPACE}/tables`;
    await getAstraClient();
    astraClient.restClient.delete(`${base}/pollOptions`);
    astraClient.restClient.delete(`${base}/pollCounts`);
    await new Promise(resolve => setTimeout(resolve, 2000));;
  }
};