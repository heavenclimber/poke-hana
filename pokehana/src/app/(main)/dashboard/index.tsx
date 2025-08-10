"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useGetPokemon } from "./hooks/useGetPokemons";
import {
  PokemonGallery,
  FilterModal,
  SearchPokemon,
} from "@/components/Organism";
import LoadingRefetch from "@/components/Atoms/LoadingRefetch";
import InfiniteScrollLoader from "@/components/Atoms/InfiniteScrollLoader";

import { IconButton, useMediaQuery, useTheme } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";

import { getDropdowns } from "@/services/getDropdowns";

const defaultFilter = {
  name: "",
  types: [] as string[],
  subtypes: [] as string[],
  rarities: [] as string[],
  supertypes: [] as string[],
};

const Dashboard = () => {
  const [filters, setFilters] = useState(defaultFilter);

  const stableFilters = useMemo(
    () => filters,
    [
      filters.name,
      JSON.stringify(filters.types),
      JSON.stringify(filters.subtypes),
      JSON.stringify(filters.rarities),
      JSON.stringify(filters.supertypes),
    ]
  );

  const { data, loading, error, loadMore, hasMore } =
    useGetPokemon(stableFilters);

  const scrollRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

  const [filterOpen, setFilterOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState<{
    types: string[];
    subtypes: string[];
    rarities: string[];
    supertypes: string[];
  }>({ types: [], subtypes: [], rarities: [], supertypes: [] });

  // Fetch dropdown data once on mount
  useEffect(() => {
    getDropdowns().then(setDropdowns).catch(console.error);
  }, []);

  const refetch = () => {
    setFilters(defaultFilter);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      if (
        scrollHeight - scrollTop - clientHeight < 100 &&
        hasMore &&
        loading !== "loading"
      ) {
        loadMore();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [loadMore, hasMore, loading]);

  useEffect(() => {
    if (isDesktop) {
      setFilterOpen(false);
    }
  }, [isDesktop]);

  // Called when search text changes
  const handleSearch = (name: string) => {
    setFilters((prev) => ({ ...prev, name }));
  };

  // Called when filters applied from modal
  const handleApplyFilters = (newFilters: {
    types: string[];
    subtypes: string[];
    rarities: string[];
    supertypes: string[];
  }) => {
    setFilters((prev) => ({
      ...prev,
      types: newFilters.types,
      subtypes: newFilters.subtypes,
      rarities: newFilters.rarities,
      supertypes: newFilters.supertypes,
    }));
    setFilterOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <main ref={scrollRef} className="flex-grow overflow-y-auto relative p-4">
        <div className="flex items-center justify-between mb-4 pt-4">
          <SearchPokemon onSearch={handleSearch} />
          <IconButton
            color="primary"
            aria-label="open filter modal"
            onClick={() => setFilterOpen(true)}
            className="bg-white shadow-md !ml-4"
          >
            <FilterListIcon />
          </IconButton>
        </div>

        <FilterModal
          open={filterOpen}
          onClose={() => setFilterOpen(false)}
          types={dropdowns.types}
          subtypes={dropdowns.subtypes}
          rarities={dropdowns.rarities}
          supertypes={dropdowns.supertypes}
          onApply={handleApplyFilters}
          selectedFilters={stableFilters}
        />

        {loading === "loading" && (!data || data.length === 0) ? (
          <LoadingRefetch fetchData={refetch} loadAllFailed={false} />
        ) : error && (!data || data.length === 0) ? (
          <LoadingRefetch fetchData={refetch} loadAllFailed={true} />
        ) : (
          <>
            <PokemonGallery cards={data || []} />
            {loading === "loading" && data && data.length > 0 && (
              <InfiniteScrollLoader />
            )}
            {!hasMore && (
              <div className="text-center p-4 text-gray-500">
                No more cards to load
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
