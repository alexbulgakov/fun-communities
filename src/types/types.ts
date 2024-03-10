/* eslint-disable no-unused-vars */
import React from 'react';

export interface User {
  first_name: string;
  last_name: string;
}

export interface GroupType {
  avatar_color?: string;
  members_count: number;
  friends?: User[];
  closed: boolean;
  name: string;
  id: number;
}

export interface FilterState {
  avatarColorFilterValues: string[];
  friendsFilter: boolean | string;
  avatarColorFilter: string[];
  privacyFilter: string;
  filtersCount: number;
}

export interface FilterContextType {
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  filters: FilterState;
}

export interface LoadingAndErrorContextType {
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  error: string | null;
  isLoading: boolean;
}
