"use client";
import React from "react";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  combinedInput: string;
};

export const PrimaryInputSearch = () => {
  // const handleInputSubmit: SubmitHandler<Inputs> = async (data) => {
  //   const [gameName, tagLine] = data.combinedInput.split("#");
  //   console.log({ gameName, tagLine });
  //   const res = await fetch(
  //     `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Accept-Language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  //         "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
  //         Origin: "https://developer.riotgames.com",
  //         "X-Riot-Token": `${process.env.RIOT_API_KEY}`,
  //       },
  //     }
  //   );

  //   try {
  //     if (res.ok) {
  //       const data = await res.json();
  //       console.log(data);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <form className="w-[500px] flex flex-col">
      <h1 className="text-white">LOL_ACCOUNTS</h1>
      <Input placeholder="Digite account#tag" name="combinedInput" />
      <button className="text-white" type="submit">
        Buscar
      </button>
    </form>
  );
};
