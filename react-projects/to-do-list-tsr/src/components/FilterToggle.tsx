const FilterToggle = ({ filter, setFilter }: { filter: "all" | "completed" | "non-completed"; setFilter: React.Dispatch<React.SetStateAction<"all" | "completed" | "non-completed">> }) => {
  return (
    <select value={filter} onChange={(e) => setFilter(e.target.value as "all" | "completed" | "non-completed")}>
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="non-completed">Non-Completed</option>
    </select>
  );
};

export default FilterToggle;
