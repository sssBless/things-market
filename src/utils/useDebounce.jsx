import React from "react";

export default function useDebounce(value, delay) {
  const [deboucedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);

  return deboucedValue;
}
