import CountryMap from "@/components/functional/country-map";
import Header from "@/components/ui/header";

export default function Home() {
  return (
    <div className="bg-slate-300/35 dark:bg-zinc-900">
      <Header>
        <strong>Sobre nos</strong>
      </Header>
      <div className="relative flex col gap-4 row p-8 pt-16 h-svh w-full">
        <CountryMap />
      </div>
    </div>
  );
}
