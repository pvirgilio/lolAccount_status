import { PrimaryInputSearch } from "@/components/PrimaryInputSearch/PrimaryInputSearch";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full">
      <section className="w-full min-h-screen flex items-center justify-center">
        <PrimaryInputSearch />
      </section>
    </main>
  );
}
