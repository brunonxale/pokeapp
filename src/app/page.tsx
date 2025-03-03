import BattleArena from "@/components/BattleArena";
import PokemonList from "@/components/PokemonList";
import TeamList from "@/components/TeamList";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen gap-5 p-5">
      <h1 className="font-bold text-2xl">POKEAPP</h1>
      <div className="flex gap-5">
        <PokemonList />
        <TeamList />
      </div>
      <div className="flex">
        <BattleArena />
      </div>
    </div>
  );
}
