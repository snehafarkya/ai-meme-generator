interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  return (
    <div className="mt-5 flex gap-2">
      <input
        type="text"
        placeholder="Search Meme by Name..."
        className="p-2 border rounded"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button
        className="px-4 py-2 bg-[#56b8b9] hover:bg-[#075354] hover:shadow-2xl cursor-pointer text-white rounded"
        onClick={() => onSearch("")} // Clears input when clicked
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
