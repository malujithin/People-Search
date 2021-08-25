import React, { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { Link } from 'gatsby';

/**
 * Component NoFound where display text not information
 * @constant
 * @type {function}
 * @returns {JSX}
 */
const NotFoundError = () => {
    const data = useSelector(state => state.people);
    const allLevelReportee = data.allLevelReportee.result;
    const individualSearchResults = data.searchResults[0];
    const [searchPath, setSearchPath] = useState('');

    useEffect(() => {
        setSearchPath(window.location.pathname);
    }, [])

    return (
        <div className="ui-search-not-found">
            <i className="fal fa-exclamation-circle"></i>
    {searchPath === '/direct-report' && 
    data.loader === 1 && 
    ((data.dataNotFound === true) || (allLevelReportee && allLevelReportee.length === 0))
    ? <span>No Organizational listing for <span>{`${individualSearchResults && individualSearchResults.firstName} ${ individualSearchResults && individualSearchResults.lastName}`}</span></span> 
    : <><span>Not finding what you’re looking for?</span> 
            <Link to={'/'}>
            <span className="link" ><i className="fas fa-search" title="New Search"></i>{('Try searching another term.')}</span></Link></>}
            
            
        </div>
    )
}

export default NotFoundError;

