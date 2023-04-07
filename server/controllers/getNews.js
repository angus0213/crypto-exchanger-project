const request = require("request-promise");

const getNews = async (req, res) => {

  try {

    const newsResponse = await request(
      "https://newsapi.org/v2/everything?q=crypto&pageSize=15&sortBy=publishedAt",
      {
        method: "GET",
        headers: { "X-Api-Key": "48597346c17d47ea8b4524f9bc3c94b2"},
      }
    );
    const newsInfo = JSON.parse(newsResponse);

console.log(newsInfo);
    if (newsInfo) {
      return res.status(200).json({ status: 200, data: newsInfo });
    } else {
      return res
        .status(404)
        .json({ status: 404, message: "news do not exist" });
    }
  } catch (err) {
    return res.status(500).json({ status: 500, message:err.message });
  }
};

module.exports = { getNews };