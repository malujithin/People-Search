import React from 'react';
import App from '../containers/App';
import Header from '../components/Header';
import SearchResults from '../components/SearchResults';

const SearchResultsPage = () => {
    return (
        <App>
            <title>People @ Company</title>
            <Header />
            <SearchResults />
        </App>
    );
};

export default SearchResultsPage;
