"use client";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PuuidDataAccountProps, UserAccount } from "../types";
import { useRouter } from "next/navigation";

export const LolContext = createContext<any>({});
export const LolProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [accountUser, setAccountUser] = useState<UserAccount[]>([]);
  const [champions, setChampions] = useState<any[]>([]);
  const [profileIcons, setProfileIcons] = useState<any[]>([]);
  const [dataPuuid, setDataPuuid] = useState<any>({});
  const URL_API = "http://localhost:4000";

  async function searchPuuid(gameName: string, tagLine: string) {
    try {
      const response = await fetch(
        `${URL_API}/account/${gameName}/${tagLine}`,
        {
          cache: "no-cache",
          method: "GET",
        }
      );
      const data = response.json();
      setDataPuuid(data);
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return { error: "User not found" };
      }
      console.log(error);
      return { error: "An error occurred" };
    }
  }

  async function allChampions() {
    try {
      const res = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/14.16.1/data/pt_BR/champion.json`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   if (champions.length === 0) {
  //     allChampions();
  //   }
  // }, [champions]);

  async function allProfileIcons() {
    try {
      const res = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/14.16.1/data/pt_BR/profileicon.json`,
        {
          method: "GET",
        }
      );
      const data = res.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   if (profileIcons.length === 0) {
  //     allProfileIcons();
  //   }
  // }, [profileIcons]);

  const DataUserPuuid = async (
    gameName: any,
    tagLine: any
  ): Promise<PuuidDataAccountProps> => {
    try {
      const response = await fetch(
        `${URL_API}/account/${gameName}/${tagLine}`,
        { cache: "no-cache", method: "GET" }
      );
      const data = await response.json();
      if (data.puuid && response.status === 200) {
        Cookies.set("puuid", data.puuid);
      }
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return {
          error: "User not found",
          puuid: "",
          gameName: "",
          tagLine: "",
        };
      }
      throw new Error("An error occurred while fetching user data");
    }
  };

  async function masteryChampionsUser(puuid: string) {
    try {
      const response = await fetch(`${URL_API}/masteryChampionsUser/${puuid}`, {
        cache: "no-cache",
        method: "GET",
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return { error: "User not found" };
      }
      console.log(error);
      return { error: "An error occurred" };
    }
  }

  async function searchRiotId(puuid: string) {
    try {
      const response = await fetch(`${URL_API}/riotId/${puuid}/`, {
        cache: "no-cache",
        method: "GET",
      });
      const data = response.json();
      return data;
    } catch (error: any) {
      if (error.response && error.response.status === 404) {
        return { error: "Search Riot id: User not found" };
      }
      console.log(error);
      return { error: "Search Riot id: An error occurred" };
    }
  }

  return (
    <LolContext.Provider
      value={{
        champions,
        profileIcons,
        searchPuuid,
        dataPuuid,
        setAccountUser,
        accountUser,
        DataUserPuuid,
        masteryChampionsUser,
        allChampions,
        allProfileIcons,
        searchRiotId,
      }}
    >
      {children}
    </LolContext.Provider>
  );
};
