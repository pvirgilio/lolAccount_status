import { AccountUserPage } from "@/components/AccountUser/AccountUser";
import { MasteryChampions } from "@/components/AccountUser/MasteryChampions";
import React from "react";

export default function AccountUserLol() {
  return (
    <main className="w-full h-full">
      <AccountUserPage />
      <MasteryChampions />
    </main>
  );
}
