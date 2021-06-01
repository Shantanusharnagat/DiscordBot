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

const getLogCollection = async () => {
  const documentClient = await getAstraClient();
  return documentClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("pollOptions");
};

const getCountCollection = async () => {
  const documentClient = await getAstraClient();
  return documentClient
    .namespace(process.env.ASTRA_DB_KEYSPACE)
    .collection("pollCounts");
};

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  addOptionHistory: async option => {
    const options = await getLogCollection();
    await options.create({
      name: option,
      timestamp: Date.now()
    });
  },

  incrementOption: async option => {
    const countCollection = await getCountCollection();
    const currentCount = await module.exports.getOptionCount(option).count;
    await countCollection.update(option, {
      count: currentCount + 1
    });
  },
  
  getOptionCount: async option => {
    const countCollection = await getCountCollection();
    const optionCount = {
      name: option,
      count: 0
    }
    try {
      const results = await countCollection.findOne({ name: { $eq: option } });
      if(results) {
        optionCount.count = results.count; 
      } else {
        // we didn't find anything, so let's create a record for next time
        await countCollection.create(option, {
          count: 0,
        });
      }
    } catch (e) {
      console.error(e);
    }
    return optionCount;
  },

  getOptionCounts: async options => {
    const optionCounts = [];
    for (const option of options) {
      optionCounts.push(await module.exports.getOptionCount(option));
    }
    return optionCounts;
  },

  getOptionHistory: async () => {
    const logCollection = await getLogCollection();
    try {
      const log = await logCollection.find();
      return Object.keys(log).map(itemId => ({
        id: itemId,
        name: log[itemId].name,
        timestamp: new Date(log[itemId].timestamp).toString()
      }));
    } catch (e) {
      console.error(e);
      return null;
    }
  },

  deleteOptionHistory: async () => {
    await getAstraClient();
    astraClient.restClient.delete(
      `/api/rest/v2/schemas/keyspaces/${process.env.ASTRA_DB_KEYSPACE}/tables/pollOptions`
    );
    astraClient.restClient.delete(
      `/api/rest/v2/schemas/keyspaces/${process.env.ASTRA_DB_KEYSPACE}/tables/pollCounts`
    );
    await sleep(2000);
  }
};
