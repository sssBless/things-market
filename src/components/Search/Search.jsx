import React from "react";
import useDebounce from "../../utils/useDebounce";
import classes from "./style.module.css";

export default function Search({
  placeholder,
  onFilterChange,
  filters,
  defaultValue
}) {
  const [value, setValue] = React.useState(defaultValue || "");
  const deboucedValue = useDebounce(value, 400);

  const handleSetValue = React.useCallback((value) => {
    setValue(value);
  }, []);

  React.useEffect(() => {
    onFilterChange("search", { ...filters["search"], value: deboucedValue });
  }, [deboucedValue, onFilterChange]);

  return (
    <div>
      <input
        onChange={(e) => {
          handleSetValue(e.target.value);
        }}
        value={value}
        placeholder={placeholder}
        className={classes.Search}
      />
    </div>
  );
}
