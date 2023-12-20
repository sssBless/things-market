import React from "react";
import classes from "./style.module.css";

const SORTS = {
  rating: {
    default: true,
    name: "By rating",
    fn: (a, b) => b.rating - a.rating
  },
  expensive: {
    //default: false,
    name: "First the expensive ones",
    fn: (a, b) => b.price - a.price
  },
  cheap: {
    //default: false,
    name: "First the cheap ones",
    fn: (a, b) => a.price - b.price
  }
};

function Sorts({ onSortChange }) {
  const [sortBy, setSortBy] = React.useState(
    Object.keys(SORTS).find((key) => SORTS[key].default)
  );

  React.useEffect(() => {
    onSortChange(() => SORTS[sortBy].fn);
  }, [sortBy, onSortChange]);

  const handleSetSortBy = React.useCallback((sort_name) => {
    setSortBy(sort_name);
  }, []);

  return (
    <div>
      <select
        value={sortBy}
        onChange={(e) => handleSetSortBy(e.target.value)}
        className={classes.Select}
      >
        {Object.entries(SORTS).map(([key, value]) => (
          <option value={key} key={key}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.memo(Sorts);
