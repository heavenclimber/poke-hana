import { useState, useEffect, useCallback, useRef } from "react";
import { getPokemon } from "@/services/getPokemon";
import { PokemonCard } from "@/services/types";
import { notification } from "@/app/provider/SnackbarContext";

type PokemonFilters = {
  name?: string;
  types?: string[];
  subtypes?: string[];
  supertypes?: string[];
  rarities?: string[];
};

export function useGetPokemon(filters: PokemonFilters) {
  const [data, setData] = useState<PokemonCard[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const filtersRef = useRef(filters);
  filtersRef.current = filters;

  const pageRef = useRef(page);
  pageRef.current = page;

  const fetchPokemon = useCallback(
    async (pageToLoad: number) => {
      setLoading("loading");
      setError(null);
      try {
        // Use latest filters from ref
        const result = await getPokemon(filtersRef.current, pageToLoad);
        if (pageToLoad === 1) {
          setData(result.data);
        } else {
          setData((prev) => [...prev, ...result.data]);
        }
        setHasMore(result.data.length > 0);
        setLoading("success");
      } catch (err: any) {
        notification({
          type: "error",
          text: err || err?.message || "Failed in fetching list",
        });
        setError(err.message || "Unknown error");
        setLoading("failed");
      }
    },
    [] // no filters dependency here
  );

  useEffect(() => {
    setPage(1);
    fetchPokemon(1);
  }, [filters]); // filters triggers fetch

  const loadMore = useCallback(() => {
    if (loading === "loading" || !hasMore) return;
    const nextPage = pageRef.current + 1;
    setPage(nextPage);
    fetchPokemon(nextPage);
  }, [fetchPokemon, hasMore, loading]);

  return { data, loading, error, fetchPokemon, loadMore, hasMore };
}
