import { type JSX } from 'react';

type FilterButtonsProps = { 
  onSearch: (search: string) => void;
};

const FilterButtons = ({ onSearch }: FilterButtonsProps): JSX.Element => {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search" onChange={handleSearch} />
      <button>Filter</button>
    </div>
  );
};

export default FilterButtons;