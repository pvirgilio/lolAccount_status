// app/account/[gameName]/[tagLine]/page.tsx
"use client";
import Image from "next/image";
import React from "react";

export function AccountUserPage({ accountUserData }: any) {
  console.log("🚀 ~ AccountUserPage ~ data:", accountUserData);

  if (!accountUserData) {
    return <div>Erro: Dados do usuário não disponíveis</div>;
  }

  const {
    puuid: fetchedPuuid,
    gameName: fetchedGameName,
    tagLine: fetchedTagLine,
    riotIdData,
  } = accountUserData;

  return (
    <section className="container w-full h-full flex items-center mt-40">
      <div className="text-white flex items-start gap-5">
        <div key={riotIdData.profileIconId} className="flex flex-col gap-2">
          <Image
            src={`https://ddragon.leagueoflegends.com/cdn/14.17.1/img/profileicon/${riotIdData.profileIconId}.png`}
            alt="Profile Icon"
            className="w-full"
            width={50}
            height={50}
          />
          <span>Level: {riotIdData.summonerLevel}</span>
        </div>
        <span className="text-3xl ">
          {fetchedGameName}#{fetchedTagLine}
        </span>
      </div>
    </section>
  );
}
