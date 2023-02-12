import { useState } from 'react';

export const SearchBar = ({handleSearch, isMobile}) => {
    const [searchBar, setSearchBar] = useState("");
    const handleSearchBarChange = (e) => {
        setSearchBar(e.target.value);
    };
    const handleClick = () => {
        handleSearch(searchBar);
    }
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleClick(searchBar);
        }
    };
    return (
        <>
            <input
                className='searchbar input is-small ml-2 has-tooltip-bottom'
                type='text'
                value={searchBar}
                onChange={handleSearchBarChange}
                onKeyDown={handleKeyDown}
            />
            <button
                className={`button is-small ml-1 ${isMobile ? 'mr-1' : 'mr-5'}`}
                onClick={handleClick}
            >
                {isMobile ? '🔍' : 'Search'}
            </button>
        </>
    );
}