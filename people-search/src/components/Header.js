import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../state/reducer';
import { useSelector } from 'react-redux';
import { navigate } from 'gatsby';
import ProifleMenu from './Section/MenuList';
import InstallApp from './Section/InstallApp';
// import { Location } from '@reach/router';
 
/**
 * Header Component
 * @constant
 * @type {function}
 * @returns {JSX}
 */
 
const Header = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.people);
    const [pathName, setPathName] = useState('');
    const searchResults = data.searchResults && data.searchResults;
    const handleLogoContent = () => {
        navigate('/');
        dispatch(actions.clearSearchForm());
    };
 
    useEffect(() => {
        if (!data.loggedInUser.gpid) {
            dispatch(actions.getLoggedInUser());
        }
        setPathName(window.location.pathname);
    }, []);
    useEffect(() => {
        if (!!data.loggedInUser.gpid) {
            if (!data.userPhoto) dispatch(actions.getUserPhoto(data.loggedInUser.gpid));
        }
        // if(window.location.pathname === '/profile'){
        //     let gpid = window.location.search.split('=')[1] || 0
        //     dispatch(actions.getIndividualDetail(gpid));
        // }
    }, [data.loggedInUser.gpid]);
 
    return (
        <div className="header">
            <div className="logo">
            <InstallApp />

                <img src={logo} alt="" />
 
                <span onClick={handleLogoContent}>People @ Company</span>
                
            </div>
            <ul className="menu">
                <li>
                    {pathName === '/'
                        ? 'Search'
                        : pathName === '/search-results'
                        ? `Search Results`
                        : pathName === '/personalization'
                        ? `Personalize Results `
                        : pathName === '/profile'
                        ? searchResults && searchResults.length > 0 && searchResults[0].professionalInfo[0].employeeType === 'External'
                            ? 'Contractor Details'
                            : 'Employee Details'
                        : pathName === '/chain-command'
                        ? `Chain of Command`
                        : pathName === '/direct-report'
                        ? `Direct Reports`
                        : null}
                </li>
                <li
                    style={{
                        marginLeft: 'auto',
                        cursor: 'pointer'
                    }}>
                    {!!data.loggedInUser && <ProifleMenu user={data.loggedInUser} image={data.userPhoto && data.userPhoto.imagepath} />}
                </li>
            </ul>
        </div>
    );
};
 
export default Header;