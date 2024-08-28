const axios = require("axios");

//* Pesquisar a conta do usuário no jogo

//* Pesquisar o puuid do usuário
async function searchPuuid(req, res) {
  const { gameName, tagLine } = req.params;
  try {
    const response = await axios.get(
      `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.RIOT_API_KEY}`,
      {
        Headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://developer.riotgames.com",
        },
      }
    );
    const data = response.data;
    return res.status(200).json(data); // Enviar a resposta HTTP em caso de sucesso
  } catch (error) {
    return res
      .status(error.response ? error.response.status : 500)
      .json(
        error.response
          ? error.response.data
          : { message: "Internal Server Error" }
      );
  }
}

//* Pesquisas todos os campeões que o usuário tem maestria
async function searchMasteryChampions(req, res) {
  const { puuid } = req.params;
  try {
    const response = await axios.get(
      `https://br1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`,
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

    // 4. Retornar os dados combinados
    return res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
}

//* Pesquisar campeões pela key/id
async function searchChampionsLol(req, res) {
  const key = req.params.id;
  try {
    // 2. Obter dados dos campeões do League of Legends
    const championsResponse = await axios.get(
      "https://ddragon.leagueoflegends.com/cdn/14.16.1/data/pt_BR/champion.json"
    );

    let championsData = championsResponse.data;
    // 3. Combinar os dados conforme necessário

    championsData.data = Object.values(championsData.data).filter(
      (champion) => champion.key === key
    );

    return res.json(championsData);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
}

async function searchRiotId(req, res, puuid) {
  try {
    const response = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`,
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
    return res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
}
module.exports = {
  searchMasteryChampions,
  searchChampionsLol,
  searchPuuid,
  searchRiotId,
};
