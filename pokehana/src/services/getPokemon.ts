import { axiosFetcher } from "@/utilities/axiosFetcher";
import { PokemonApiResponse } from "./types";

type PokemonFilters = {
  name?: string;
  types?: string[];
  subtypes?: string[];
  supertypes?: string[];
  rarities?: string[];
};

export async function getPokemon(
  filters: PokemonFilters,
  page: number = 1,
  pageSize: number = 8
): Promise<PokemonApiResponse> {
  // Build query string for filters
  const queries: string[] = [];

  if (filters.name) {
    // Escape quotes inside name if needed
    queries.push(`name:"${filters.name}"`);
  }

  if (filters.types && filters.types.length > 0) {
    const typesQuery = filters.types.map((t) => `"${t}"`).join(" ");
    queries.push(`types:${typesQuery}`);
  }

  if (filters.subtypes && filters.subtypes.length > 0) {
    const subtypesQuery = filters.subtypes.map((s) => `"${s}"`).join(" ");
    queries.push(`subtypes:${subtypesQuery}`);
  }

  if (filters.supertypes && filters.supertypes.length > 0) {
    const supertypesQuery = filters.supertypes.map((s) => `"${s}"`).join(" ");
    queries.push(`supertypes:${supertypesQuery}`);
  }

  if (filters.rarities && filters.rarities.length > 0) {
    const raritiesQuery = filters.rarities.map((s) => `"${s}"`).join(" ");
    queries.push(`rarities:${raritiesQuery}`);
  }

  // Join all filter queries by space (AND operator in their API)
  const q = queries.join(" ");

  return await axiosFetcher(`/cards`, {
    params: {
      q,
      pageSize,
      page,
    },
  });
}
