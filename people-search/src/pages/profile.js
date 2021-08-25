import React from 'react';
import App from '../containers/App';
import Header from '../components/Header';
import Profile from '../components/Profile';

const ProfilePage = () => {
    return (
        <App>
            <title>People @ company</title>
            <Header />

            <Profile />

        </App>
    );
};

export default ProfilePage;
