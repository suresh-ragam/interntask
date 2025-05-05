import { FaSearch } from "react-icons/fa";

interface Props {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
}
  
  const Searchbar = ({ searchTerm, setSearchTerm }: Props) => {
    return (
      <div className = "search-bar">
        <FaSearch className="search-icon"/>
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    );
  };
  
  export default Searchbar;  