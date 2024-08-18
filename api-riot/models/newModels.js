const axios = require("axios");

async function searchAccoutGame(req, res) {
  const { gameName, tagLine } = req.params;
  try {
    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://developer.riotgames.com",
          "X-Riot-Token": process.env.RIOT_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
}

module.exports = {
  searchAccoutGame,
};
