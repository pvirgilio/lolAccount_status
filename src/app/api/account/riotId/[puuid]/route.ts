import axios from "axios";
import { useParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const match = pathname.match(/\/api\/account\/riotId\/([^\/]+)/);

  if (!match) {
    return NextResponse.json({ error: "Invalid URL format" }, { status: 400 });
  }

  const [, puuid] = match;

  if (!puuid) {
    return NextResponse.json(
      { error: "Missing gameName or tagLine" },
      { status: 400 }
    );
  }
  try {
    const response = await axios.get(
      `https://br1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.RIOT_API_KEY}`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
          "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
          "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
          Origin: "https://developer.riotgames.com",
        },
      }
    );
    const data = response.data;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Failed to get schedules:", error);
    // Retorne uma resposta de erro genérica para o cliente
    return NextResponse.json(
      { error: "Failed to get schedules" },
      { status: 500 }
    );
  }
}
