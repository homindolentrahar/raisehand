const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.API_KEY,
});

async function getTags() {
  const database = await notion.databases.retrieve({
    database_id: process.env.DB_ID,
  });

  return propertiesById(database.properties)[process.env.TAGS_ID].multi_select
    .options;
}

async function getModels() {
  const database = await notion.databases.retrieve({
    database_id: process.env.DB_ID,
  });

  return propertiesById(database.properties)[
    process.env.LEARNING_MODEL_ID
  ].select.options.map((opt) => ({
    id: opt.id,
    name: opt.name,
  }));
}

async function getTracks() {
  const database = await notion.databases.retrieve({
    database_id: process.env.DB_ID,
  });

  return propertiesById(database.properties)[
    process.env.TRACK_ID
  ].select.options.map((opt) => ({
    id: opt.id,
    name: opt.name,
  }));
}

function propertiesById(properties) {
  return Object.values(properties).reduce((obj, property) => {
    const { id, ...props } = property;

    return { ...obj, [id]: props };
  }, {});
}

async function getSuggestions() {
  const pages = await notion.databases.query({
    database_id: process.env.DB_ID,
    sorts: [{ property: process.env.VOTES_ID, direction: "descending" }],
  });

  return pages.results.map(fromNotionObject);
}

async function getSuggestion(pageId) {
  const page = await notion.pages.retrieve({ page_id: pageId });

  return page;
}

async function suggestTopic({
  title,
  description,
  learningModel,
  track,
  tags,
}) {
  const response = await notion.pages.create({
    parent: {
      database_id: process.env.DB_ID,
    },
    properties: {
      [process.env.TITLE_ID]: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      [process.env.DESCRIPTION_ID]: {
        rich_text: [
          {
            text: {
              content: description,
            },
          },
        ],
      },
      [process.env.LEARNING_MODEL_ID]: {
        select: {
          name: learningModel,
        },
      },
      [process.env.TRACK_ID]: {
        select: {
          name: track,
        },
      },
      [process.env.VOTES_ID]: {
        number: 0,
      },
      [process.env.TAGS_ID]: {
        multi_select: tags.map((tag) => ({
          id: tag.id,
        })),
      },
    },
  });

  return response;
}

async function upvoteSuggestion(pageId) {
  const suggestion = await getSuggestion(pageId);
  const votes =
    propertiesById(suggestion.properties)[process.env.VOTES_ID].number + 1;

  const response = await notion.pages.update({
    page_id: pageId,
    properties: {
      [process.env.VOTES_ID]: {
        number: votes,
      },
    },
  });

  return response;
}

function fromNotionObject(page) {
  const properties = propertiesById(page.properties);

  console.log(properties);

  return {
    id: page.id,
    title: properties[process.env.TITLE_ID].title[0].text.content,
    description:
      properties[process.env.DESCRIPTION_ID].rich_text[0].text.content,
    learningModel: properties[process.env.LEARNING_MODEL_ID].select,
    track: properties[process.env.TRACK_ID].select,
    vote: properties[process.env.VOTES_ID].number,
    tags: properties[process.env.TAGS_ID].multi_select,
  };
}

module.exports = {
  getSuggestion,
  getSuggestions,
  suggestTopic,
  getTags,
  getModels,
  getTracks,
  upvoteSuggestion,
};
