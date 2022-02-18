require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const {
  getSuggestions,
  getModels,
  getTags,
  getTracks,
  suggestTopic,
  upvoteSuggestion,
} = require("./notion");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get("/suggestions", async (req, res) => {
  const suggestions = await getSuggestions();

  res.json(suggestions);
});

app.get("/tags", async (req, res) => {
  const tags = await getTags();

  res.json(tags);
});

app.get("/models", async (req, res) => {
  const models = await getModels();

  res.json(models);
});

app.get("/tracks", async (req, res) => {
  const tracks = await getTracks();

  res.json(tracks);
});

app.post("/create", async (req, res) => {
  const { title, description, learningModel, track, tags } = req.body;

  await suggestTopic({
    title,
    description,
    learningModel,
    track,
    tags,
  });
});

app.post("/vote", async (req, res) => {
  await upvoteSuggestion(req.body.id);
});

app.listen(port, () => {
  console.log(`Listening on ${port}...`);
});
