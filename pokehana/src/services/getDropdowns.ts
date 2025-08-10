import { axiosFetcher } from "@/utilities/axiosFetcher";

export type DropdownData = {
  types: string[];
  subtypes: string[];
  rarities: string[];
  supertypes: string[];
};

export async function getDropdowns(): Promise<DropdownData> {
  const endpoints = {
    types: "/types",
    subtypes: "/subtypes",
    rarities: "/rarities",
    supertypes: "/supertypes",
  };

  // Fetch all in parallel
  const [typesRes, subtypesRes, raritiesRes, supertypesRes] = await Promise.all(
    [
      axiosFetcher(endpoints.types),
      axiosFetcher(endpoints.subtypes),
      axiosFetcher(endpoints.rarities),
      axiosFetcher(endpoints.supertypes),
    ]
  );

  return {
    types: typesRes.data || [],
    subtypes: subtypesRes.data || [],
    rarities: raritiesRes.data || [],
    supertypes: supertypesRes.data || [],
  };
}
