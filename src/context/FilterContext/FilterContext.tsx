import React, {
  createContext, ReactNode, useState, useMemo,
} from 'react';

import { FilterContextType, FilterState } from '../../types/types.ts';

const defaultFilterState: FilterState = {
  avatarColorFilterValues: [],
  avatarColorFilter: [],
  privacyFilter: 'all',
  friendsFilter: 'all',
  filtersCount: 0,
};

export const FilterContext = createContext<FilterContextType>({
  filters: defaultFilterState,
  setFilters: () => { },
});

export default function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const value = useMemo(() => ({ setFilters, filters }), [filters]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
}
