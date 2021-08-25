import React from 'react';
import App from '../containers/App';
import Header from '../components/Header';
import DirectReport from '../components/DirectReport';

const DirectReportPage = () => {
    return (
        <App>
            <title>People @ Company</title>
            <Header />
            <DirectReport />
        </App>
    );
};

export default DirectReportPage;
