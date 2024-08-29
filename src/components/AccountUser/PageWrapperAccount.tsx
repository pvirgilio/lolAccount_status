"use client";
import React, { useEffect, useState, useContext } from "react";
import { AccountUserPage } from "./AccountUser";
import { MasteryChampions } from "./MasteryChampions";
import { LolContext } from "@/app/context/lolcontext";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const PageWrapperAccount: React.FC = () => {
  const {
    DataUserPuuid,
    masteryChampionsUser,
    allChampions,
    allProfileIcons,
    searchRiotId,
  } = useContext(LolContext);
  const [loading, setLoading] = useState(true);
  const [accountUserData, setAccountUserData] = useState<any>(null);
  const [masteryChampionsData, setMasteryChampionsData] = useState<any>(null);
  const [championsData, setChampionsData] = useState<any>({});
  const [profileIcons, setProfileIcons] = useState<any>({});
  const params = useParams();
  const { gameName, tagLine } = params;

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await DataUserPuuid(gameName, tagLine);
        setAccountUserData(userData);

        const riotIdData = await searchRiotId(userData.puuid);
        setAccountUserData({
          ...userData,
          riotIdData: riotIdData,
        });

        const masteryData = await masteryChampionsUser(userData.puuid);
        setMasteryChampionsData(masteryData);

        const allChampionsData = await allChampions();
        setChampionsData(allChampionsData.data);

        const allProfileIconsData = await allProfileIcons();
        setProfileIcons(allProfileIconsData.data);

        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [gameName, tagLine]);

  const getChampionInfo = (championId: number) => {
    for (let key in championsData) {
      if (championsData[key].key == championId) {
        return championsData[key];
      }
    }
    return null;
  };

  const getProfileIconUser = (profileIconId: number) => {
    for (let id in profileIcons) {
      if (profileIcons[id].id == profileIconId) {
        return profileIcons[id];
      }
    }
    return null;
  };

  if (loading) {
    return (
      <div className="absolute flex items-center justify-center bg-white h-screen w-full">
        <LoaderCircle className="animate-spin" color="blue" size={50} />
      </div>
    );
  }

  return (
    <section className="container w-full h-full flex flex-col backdrop-blur-sm">
      <AccountUserPage
        accountUserData={accountUserData}
        getProfileIconUser={getProfileIconUser}
        profileIcons={profileIcons}
      />
      <MasteryChampions
        masteryChampions={masteryChampionsData}
        getChampionInfo={getChampionInfo}
      />
    </section>
  );
};

export default PageWrapperAccount;
