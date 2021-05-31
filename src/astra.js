const { createClient } = require("@astrajs/collections");

let astraClient = null;

const getAstraClient = async () => {
  if (astraClient === null) {
    astraClient = await createClient(
      {
        astraDatabaseId: process.env.ASTRA_DB_ID,
        astraDatabaseRegion: process.env.ASTRA_DB_REGION,
        applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN
      },
      30000
    );
  }
  return astraClient;
};

const getPollCollection = async () => {
  const documentClient = await getAstraClient();
  return documentClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("pollOptions");
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  addOptionHistory: async option => {
    const options = await getPollCollection();
    await options.create({
      optionName: option.name,
      timestamp: Date.now()
    });
  },

  getOptionCounts: async options => {
    const optionsCollection = await getPollCollection();
    const optionCounts = [];
    for (const option of options) {
      try {
        let results = await optionsCollection.find({ name: { $eq: option } });
        optionCounts.push({
          name: option,
          count: Object.keys(results).length
        });
      } catch (e) {
        // couldn't find results, so setting this option to 0
        optionCounts.push({
          name: option,
          count: 0
        });
      }
    }
    return optionCounts;
  },

  getOptionHistory: async () => {
    const optionsCollection = await getPollCollection();
    try {
      const results = await optionsCollection.find();
      return Object.keys(results).map(itemId => ({
        id: itemId,
        name: results[itemId].optionName,
        timestamp: new Date(results[itemId].timestamp).toString()
      }));
    } catch (e) {
      return [];
    }
  },

  deleteOptionHistory: async () => {
    await getAstraClient();
    astraClient.restClient.delete(
      `/api/rest/v2/schemas/keyspaces/${process.env.ASTRA_DB_KEYSPACE}/tables/colors`
    );
    await sleep(2000);
  }
};
