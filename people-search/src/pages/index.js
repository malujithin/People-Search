import React from 'react';
import App from '../containers/App';
import Header from '../components/Header';
import SearchForm from '../components/SearchForm';

const HomePage = () => {
    return (
        <App>
            <title>People @ Company</title>
            <Header />
            <SearchForm />
        </App>
    );
};

export default HomePage;
