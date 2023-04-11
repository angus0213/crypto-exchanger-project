const NewsAPI = require("newsapi");
//get News from API
const getNews = (req, res) => {
  const newsapi = new NewsAPI("825ce449f8494dcba0c821eac3f357ce");//for testing reason, put API key here. It should be in .env file

  try {//this API can not work with "request" properly, used yarn add
    newsapi.v2
      .everything({
        q: "crypto",
        sortBy: "publishedAt",
        page: 3,
      })
      .then((response) => {
        if (response) {
          return res.status(200).json({ status: 200, data: response });
        } else {
          return res
            .status(404)
            .json({ status: 404, message: "news do not exist" });
        }
      });
  } catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
  }
};

module.exports = { getNews };
