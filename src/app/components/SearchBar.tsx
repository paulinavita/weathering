import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (city: string) => void;
  isLoading: boolean;
  searchValue: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  isLoading,
  searchValue,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    setSearch(searchValue);
  }, [searchValue]);

  const handleSearch = () => {
    if (search.trim()) {
      onSearch(search);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      handleSearch();
    }
  };

  return (
    <div className="w-full flex flex-col justify-center gap-2">
      <div className="text-sm font-semibold">Search by city</div>
      <div className="flex items-center gap-2">
        <Input
          data-testid="search-input"
          value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="e.g Bali"
        />
        <Button
          disabled={isLoading}
          onClick={handleSearch}
          className="min-w-20"
          data-testid="search-btn"
        >
          {isLoading ? (
            <Loader2 data-testid="search-btn-loader" className="animate-spin" />
          ) : (
            "Search"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
