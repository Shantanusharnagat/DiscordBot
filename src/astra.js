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

const getPollCountCollection = async () => {
  const documentClient = await getAstraClient();
  return documentClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("pollCounts");
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  addOptionHistory: async option => {
    const options = await getPollCollection();
    await options.create({
      name: option.name,
      timestamp: Date.now()
    });
  },

  incrementOption: async option => {
    const countCollection = await getPollCountCollection();
    const currentCount = module.exports.getOptionCount(option).count;
    await countCollection.update(option, {
      count: currentCount + 1
    });
  },

  getOptionCount: async option => {
    const countCollection = await getPollCountCollection();
    try {
      let results = await countCollection.findOne({ name: { $eq: option } });
      return {
        name: option,
        count: Object.keys(results).length
      };
    } catch (e) {
      // couldn't find results, so setting this option to 0
      // we'll also set it to 0 in the Astra db so it'll be in there next time
      await countCollection.create(option, {
        count: 0
      });
      return {
        name: option,
        count: 0
      };
    }
  },

  getOptionCounts: async options => {
    const optionCounts = [];
    for (const option of options) {
      optionCounts.push(module.exports.getOptionCount(option));
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
