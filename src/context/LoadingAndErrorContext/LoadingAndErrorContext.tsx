import React, {
  createContext, ReactNode, useState, useMemo,
} from 'react';

import { LoadingAndErrorContextType } from '../../types/types.ts';

export const LoadingAndErrorContext = createContext<
  LoadingAndErrorContextType | undefined
>(undefined);

export function LoadingAndErrorProvider({ children }:{ children: ReactNode }) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const value = useMemo(() => ({
    setLoading, isLoading, setError, error,
  }), [isLoading, error]);

  return (
    <LoadingAndErrorContext.Provider
      value={value}
    >
      {children}
    </LoadingAndErrorContext.Provider>
  );
}
