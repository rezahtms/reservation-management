"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";

export function useSearchParamsFilter<T extends Record<string, string>>(
  defaultValues: T,
) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlFilters = React.useMemo((): T => {
    const next = { ...defaultValues };
    for (const key of Object.keys(defaultValues) as Array<keyof T>) {
      const paramKey = String(key);
      const raw = searchParams.get(paramKey);
      if (raw !== null && raw !== "") {
        next[key] = raw as T[keyof T];
      }
    }
    return next;
  }, [searchParams, defaultValues]);

  const [optimisticFilters, setOptimisticFilters] = React.useOptimistic(
    urlFilters,
    (_state: T, nextState: T) => nextState,
  );

  const applyFilters = React.useCallback(
    (nextFilters: T) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const key of Object.keys(defaultValues) as Array<keyof T>) {
        const paramKey = String(key);
        const value = nextFilters[key];
        const defaultValue = defaultValues[key];

        if (!value || value.trim() === "" || value === defaultValue) {
          params.delete(paramKey);
        } else {
          params.set(paramKey, value);
        }
      }

      const queryString = params.toString();
      const nextUrl = queryString ? `${pathname}?${queryString}` : pathname;

      React.startTransition(() => {
        setOptimisticFilters(nextFilters);
        router.replace(nextUrl, { scroll: false });
      });
    },
    [defaultValues, pathname, router, searchParams, setOptimisticFilters],
  );

  const setFilter = React.useCallback(
    <K extends keyof T>(key: K, value: T[K]) => {
      applyFilters({
        ...optimisticFilters,
        [key]: value,
      });
    },
    [applyFilters, optimisticFilters],
  );

  const setMultipleFilters = React.useCallback(
    (updates: Partial<T>) => {
      applyFilters({
        ...optimisticFilters,
        ...updates,
      });
    },
    [applyFilters, optimisticFilters],
  );

  const resetFilters = React.useCallback(() => {
    applyFilters({ ...defaultValues });
  }, [applyFilters, defaultValues]);

  return {
    filters: optimisticFilters,
    setFilter,
    setMultipleFilters,
    resetFilters,
    searchParams,
  };
}
