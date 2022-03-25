import React, { useState } from 'react';
import SearchBar from "material-ui-search-bar";


export const MySearchBar = props => {

    const { value, placeholder, searchData } = props;
    const [searchValue, setSearchValue] = useState(value);

    return (
        <SearchBar
            value={value}
            onChange={newValue => setSearchValue(newValue)}
            onRequestSearch={() => searchData(searchValue)}
            style={{
                margin: '0 auto',
                height: '2rem',
                maxWidth: 600,
                width: '100%',
            }}
            placeholder={placeholder ? placeholder : 'Buscar...'}
        />
    )
}

