import React from 'react';
import App from '../containers/App';
import Header from '../components/Header';
import ChainCommand from '../components/ChainCommand';

const ChainCommandPage = () => {
    return (
        <App>
            <title>People @ Company</title>
            <Header />
            <ChainCommand />
        </App>
    );
};

export default ChainCommandPage;
