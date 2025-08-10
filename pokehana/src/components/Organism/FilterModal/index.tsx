"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  Button,
  Divider,
  Stack,
  Autocomplete,
  TextField,
} from "@mui/material";

type FilterModalProps = {
  open: boolean;
  onClose: () => void;
  types: string[];
  subtypes: string[];
  rarities: string[];
  supertypes: string[];
  selectedFilters: {
    types: string[];
    subtypes: string[];
    rarities: string[];
    supertypes: string[];
  };
  onApply: (filters: {
    types: string[];
    subtypes: string[];
    rarities: string[];
    supertypes: string[];
  }) => void;
};

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  types,
  subtypes,
  rarities,
  supertypes,
  selectedFilters,
  onApply,
}) => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSubtypes, setSelectedSubtypes] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [selectedSupertypes, setSelectedSupertypes] = useState<string[]>([]);

  console.log("banana", selectedTypes);

  useEffect(() => {
    if (open) {
      setSelectedTypes(selectedFilters.types || []);
      setSelectedSubtypes(selectedFilters.subtypes || []);
      setSelectedRarities(selectedFilters.rarities || []);
      setSelectedSupertypes(selectedFilters.supertypes || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, JSON.stringify(selectedFilters)]);

  const handleApply = () => {
    onApply({
      types: selectedTypes,
      subtypes: selectedSubtypes,
      rarities: selectedRarities,
      supertypes: selectedSupertypes,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="filter-modal-title"
      aria-describedby="filter-modal-description"
      className="flex items-center justify-center"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 max-h-[80vh] overflow-y-auto w-80 transform -translate-x-1/2 -translate-y-1/2 fixed top-1/2 left-1/2">
        <h2
          id="filter-modal-title"
          className="text-xl font-semibold mb-4 text-gray-900"
        >
          Filters
        </h2>

        <Stack spacing={3} className="mb-4">
          <Autocomplete
            multiple
            options={types}
            value={selectedTypes}
            onChange={(_, newValue) => setSelectedTypes(newValue)}
            renderInput={(params) => <TextField {...params} label="Types" />}
            disableCloseOnSelect
          />

          <Autocomplete
            multiple
            options={subtypes}
            value={selectedSubtypes}
            onChange={(_, newValue) => setSelectedSubtypes(newValue)}
            renderInput={(params) => <TextField {...params} label="Subtypes" />}
            disableCloseOnSelect
          />

          <Autocomplete
            multiple
            options={rarities}
            value={selectedRarities}
            onChange={(_, newValue) => setSelectedRarities(newValue)}
            renderInput={(params) => <TextField {...params} label="Rarities" />}
            disableCloseOnSelect
          />

          <Autocomplete
            multiple
            options={supertypes}
            value={selectedSupertypes}
            onChange={(_, newValue) => setSelectedSupertypes(newValue)}
            renderInput={(params) => (
              <TextField {...params} label="Supertypes" />
            )}
            disableCloseOnSelect
          />
        </Stack>

        <div className="flex justify-between gap-3">
          <Button
            className="flex-1 w-full"
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 w-full"
            variant="contained"
            color="primary"
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
