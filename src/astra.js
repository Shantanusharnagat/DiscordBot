const { createClient } = require("@astrajs/collections");

let astraClient = null;

const getAstraClient = async () => {
  if (astraClient === null) {
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
      //console.error(e);
      astraClient = null;
    }
  }
  return astraClient;
};

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
  addOptionHistory: async option => {
    const log = await getCollection("pollOptions");
    await log.create({
      name: option,
      timestamp: Date.now()
    });
    await module.exports.incrementOption(option);
  },

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

  getOptionCount: async (option, collection) => {
    const countCollection = await getCollection("pollCounts");
    const optionCount = {
      name: option,
      count: 0
    };
    try {
      const results = await countCollection.get(option);
      if (results) {
        optionCount.count = results.count || 0;
      } else {
        // we didn't find anything, so let's create a record for next time
        const newOption = await countCollection.create(option, optionCount);
        if (!newOption) {
          console.error("could not create option count row in DB");
        }
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
    await sleep(2000);
  }
};