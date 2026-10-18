"use client";

import * as React from "react";

export function useDebounce<T>(value: T, delayInMs = 300): T {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(value), delayInMs);
    return () => clearTimeout(timeoutId);
  }, [value, delayInMs]);

  return debouncedValue;
}
