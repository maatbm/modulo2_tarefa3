import { useState, ChangeEvent } from 'react';
import RenderMoviesTable from '../movieTable/movieTable';
import './searchBarStyle.css';

function SearchBar(){
  const [searchTerm, setSearchTerm] = useState('');

  function handleInputChange(event: ChangeEvent<HTMLInputElement>){
    setSearchTerm(event.target.value);
  };

  return (
    <>
    <div>
        <input type="text" value={searchTerm} onChange={handleInputChange} placeholder="Insira a palavra chave" className="searchInput"/>
    </div>
    <RenderMoviesTable filterMovie={searchTerm}/>
    </>
  );
};

export default SearchBar;
