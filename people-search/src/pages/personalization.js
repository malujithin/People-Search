import React from 'react';
import App from '../containers/App';
import Header from '../components/Header';
import ResultsPersonalization from '../components/ResultsPersonalization';

const PersonalizationPage = () => {
    return (
        <App>
            <title>People @ Pepsico</title>
            <Header />
            <ResultsPersonalization />
        </App>
    );
};

export default PersonalizationPage;
