import { FavoritePair } from "../components/FavoritePair";
import { FavoritesSectionEmpty } from "../components/FavoritesSectionEmpty";
import { useFavorites } from "../hooks/use-favorites";

export function FavoritesSection() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return <FavoritesSectionEmpty />;
  }

  return (
    <section className="rounded-16 border border-neutral-600 bg-neutral-700 p-4 md:p-5">
      <div className="flex flex-col gap-y-4 md:gap-y-5">
        <div className="flex flex-wrap items-center justify-between gap-x-4">
          <p className="text-preset-3-medium text-neutral-50 uppercase">
            Pinned pairs
          </p>
          <p className="text-preset-5 text-neutral-50 uppercase opacity-70">
            {favorites.length} favorites
          </p>
        </div>
        <div className="flex max-h-162.5 scrollbar-thin scrollbar-thumb-neutral-200 flex-col gap-y-3 overflow-y-auto p-1">
          {favorites.map((favorite) => {
            return (
              <FavoritePair
                key={`${favorite.sendCurrency}-${favorite.receiveCurrency}`}
                {...favorite}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
