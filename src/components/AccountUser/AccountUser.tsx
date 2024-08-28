// app/account/[gameName]/[tagLine]/page.tsx
"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "react-query";
import React, { useContext, useEffect } from "react";
import { LolContext } from "@/app/context/lolcontext";
import Cookies from "js-cookie";

export function AccountUserPage() {
  const { DataUserPuuid } = useContext(LolContext);
  const router = useRouter();
  const [AccountUserDataInfo, setAccountUserDataInfo] = React.useState<any>([]);
  const params = useParams();
  const { gameName, tagLine } = params;

  useEffect(() => {
    async function fetchUserPuuid() {
      try {
        const data = await DataUserPuuid(gameName, tagLine);
        setAccountUserDataInfo(data);
      } catch (error: any) {
        console.error("🚀 ~ fetchUserPuuid ~ error:", error);
      }
    }
    fetchUserPuuid();
  }, [gameName, tagLine]);

  const {
    puuid: fetchedPuuid,
    gameName: fetchedGameName,
    tagLine: fetchedTagLine,
  } = AccountUserDataInfo;
  //* Using React Query

  // const { data, isLoading, error } = useQuery<PuuidDataAccountProps>({
  //   queryKey: ["account", gameName, tagLine],
  //   queryFn: () => fetchUserPuuid(gameName, tagLine),
  // });
  // if (isLoading) {
  //   return (
  //     <div className="container w-full h-full flex items-center mt-40">
  //       <h2 className="text-3xl text-white">Carregando...</h2>
  //     </div>
  //   );
  // }
  // if (error || !data) {
  //   return <div>Erro ao carregar os dados do usuário</div>;
  // }

  return (
    <section className="container w-full h-full flex items-center mt-40">
      <div className="text-white flex flex-col">
        <span className="font-light">{fetchedPuuid}</span>
        <span className="text-3xl ">
          {fetchedGameName}#{fetchedTagLine}
        </span>
      </div>
    </section>
  );
}
