"use client";
import React from "react";
import Image from "next/image";

export function MasteryChampions({
  masteryChampions = [],
  getChampionInfo,
}: any) {
  return (
    <section className="w-full container mt-20 flex flex-col gap-10">
      <h2 className="text-3xl text-white">Campeões mais jogados</h2>
      <div className="grid grid-cols-5">
        {masteryChampions.slice(0, 5).map((champion: any) => {
          const championInfo = getChampionInfo(champion.championId);
          if (!championInfo) return null;

          return (
            <div
              className="w-full flex gap-2 text-white"
              key={champion.championId}
            >
              <Image
                width={80}
                height={50}
                className="max-w-[100px]"
                src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/champion/${championInfo.image.full}`}
                alt={championInfo.name}
              />

              <div className="flex flex-col">
                <span>
                  <strong className="text-sm">Nome:</strong> {championInfo.name}
                </span>
                <span>
                  <strong className="text-sm">Level:</strong>{" "}
                  {champion.championLevel}
                </span>
                <span>
                  <strong className="text-sm">Pontos:</strong>{" "}
                  {champion.championPoints}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
