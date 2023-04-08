const NewsAPI = require('newsapi');

const getNews =  (req, res) => {
  const newsapi = new NewsAPI('48597346c17d47ea8b4524f9bc3c94b2');
  try {
    newsapi.v2.everything({
      q: 'crypto',
      sortBy: 'publishedAt',
      page: 3
    }).then(response => {
      if (response) {
        return res.status(200).json({ status: 200, data: response });
      } else {
        return res
          .status(404)
          .json({ status: 404, message: "news do not exist" });
      }
 
    });

  }
  catch (err) {
    return res.status(500).json({ status: 500, message:err.message });
  }
};

module.exports = { getNews };
