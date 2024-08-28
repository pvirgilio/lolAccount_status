"use client";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { LolContext } from "@/app/context/lolcontext";
import axios from "axios";
import Image from "next/image";

export function MasteryChampions() {
  const { masteryChampionsUser } = useContext(LolContext);
  const [masteryChampions, setMasteryChampions] = useState<any[]>([]);
  const [championsData, setChampionsData] = useState<any>({});
  const puuid = Cookies.get("puuid");

  useEffect(() => {
    async function fetchChampionsData() {
      try {
        const response = await axios.get(
          "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/pt_BR/champion.json"
        );
        setChampionsData(response.data.data);
      } catch (error: any) {
        console.error("🚀 ~ fetchChampionsData ~ error:", error);
      }
    }

    async function fetchMasteryChampions() {
      if (puuid) {
        try {
          const data = await masteryChampionsUser(puuid);
          setMasteryChampions(data);
        } catch (error: any) {
          console.error("🚀 ~ fetchMasteryChampions ~ error:", error);
        }
      } else {
        console.log("🚀 ~ fetchMasteryChampions ~ puuid", "not found");
      }
    }

    fetchChampionsData();
    fetchMasteryChampions();
  }, [puuid]);

  const getChampionInfo = (championId: number) => {
    for (const key in championsData) {
      if (championsData[key].key == championId) {
        return championsData[key];
      }
    }
    return null;
  };

  return (
    <section className="container mt-20 grid grid-cols-10 gap-10">
      {masteryChampions.map((champion: any) => {
        const championInfo = getChampionInfo(champion.championId);
        if (!championInfo) return null;

        return (
          <div className="flex flex-col text-white" key={champion.championId}>
            <Image
              width={50}
              height={50}
              src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${championInfo.image.full}`}
              alt={championInfo.name}
            />
            <span>{championInfo.name}</span>
            <span>{champion.championLevel}</span>
            <span>{champion.championPoints}</span>
          </div>
        );
      })}
    </section>
  );
}
