interface SortDateProps {
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
}

const SortDate = ({ sortOrder, setSortOrder }: SortDateProps) => {
  return (
    <div className="p-4 max-w-2xl mx-auto">
      <select
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value as "asc" | "desc")}
        className="p-2 border border-gray-300 rounded-lg focus:ontline-none focus:ring-2 focus:ring-black-500"
      >
        <option value="desc">Les derniers articles</option>
        <option value="asc">Les articles les plus anciens</option>
      </select>
    </div>
  );
};

export default SortDate;
