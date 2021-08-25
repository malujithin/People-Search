import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../state/reducer';
import { useSelector } from 'react-redux';
import { getSafe } from '../data/utils';
import NotFoundError from './NotFoundError';
import { Link, navigate } from 'gatsby';

/**
 * Main Component to include al subcomponent in Home Page App
 * @constant
 * @type {function}
 * @returns {JSX}
 */

const Profile = () => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.people);
    const individualSearchResults = data.searchResults;
    const directReporteeCount = data.directReporteeCount && data.directReporteeCount[0] ? data.directReporteeCount[0].reporteeCount : 0;
    const managerDetails = data.managerDetails[0];

    const handleLevelReportee = () => {
        dispatch(actions.setPersonalizedData([]));
        if (individualSearchResults) {
            let gpid = individualSearchResults[0].professionalInfo[0].gpid;
            let level = individualSearchResults[0].professionalInfo[0].level;
            dispatch(actions.setReporteesLevel(level));
            navigate(`/direct-report?gpid=${gpid}&level=${level}`);
            // dispatch(actions.setScreen(6));
        }

        dispatch(actions.setPreviousScreen(4));
    };
    const handleChainAction = () => {
        dispatch(actions.setPreviousScreen(4));
    };
    const handleProfileNewSearch = () => {
        // dispatch(actions.clearSearchForm())
        // dispatch(actions.setScreen(1));
    };

    
    useEffect(() => {
        if (parseInt(individualSearchResults.length) === 1) {
            dispatch(actions.getManagerDetails(individualSearchResults[0].professionalInfo[0].managerId));
        }
    }, [individualSearchResults]);

    useEffect(() => {
        let gpid = window.location.search.split('=')[1] || 0
            dispatch(actions.getIndividualDetail(gpid));
        if (data.directReporteeCount <= 0) {
            dispatch(actions.getDirectReporteeCount(gpid));
        }
    },[])

    

    return (
        <div>
            {data.loader === 0 && (
                <div className="suspense">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            )}
            {data.loader === 1 && individualSearchResults && individualSearchResults.length > 0 && managerDetails ? (
                <div className="profile">
                    <div className="profile-buttons-top">
                        <Link to={`/chain-command?gpid=` + individualSearchResults[0].professionalInfo[0].gpid} onClick={handleChainAction}>
                            <button className="bottom-chain-command">
                                <i className="fas fa-users icon-buttom" title="Chain of Command"></i>Chain of Command
                            </button>
                        </Link>

                        <button className="button-report" title={`Direct Reports (${directReporteeCount})`} onClick={handleLevelReportee}>
                            <i className="fas fa-user-friends icon-buttom"></i>Direct Reportees
                        </button>
                        <Link to={'/'} onClick={handleProfileNewSearch}>
                            <button className="button-search">
                                <i className="fas fa-search" title="New Search"></i>Back to Search
                            </button>
                        </Link>
                    </div>
                    {individualSearchResults &&
                        individualSearchResults.map(detail => {
                            return (
                                <div class="table-container">
                                    <div class="row">
                                        <div class="col-md-6-one">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">PERSONAL DATA</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">First Name</th>
                                                        <td>{getSafe(() => detail.firstName)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Last Name</th>
                                                        <td>{getSafe(() => detail.lastName)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Secondary First Name</th>
                                                        <td>{getSafe(() => detail.secondaryFirstName)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Secondary Last Name</th>
                                                        <td>{getSafe(() => detail.secondaryLastName)}</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">GPID</th>
                                                        <td>{detail.professionalInfo[0].gpid}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Job Title</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].title)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Email Address</th>
                                                        <td>{getSafe(() => detail.emailAddresses[0].emailAddress)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Work Phone</th>
                                                        <td>{getSafe(() => detail.phoneNumbers[0].phoneNumber)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="col-md-6-two">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">LOCATION DATA</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Location Name</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].locationName)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Location Address</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].locationAddrss1)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Country</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].locationCountryName)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">State</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].state)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">City</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].locationCityName)}</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">Time Zone</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].locationTimezone)}</td>
                                                    </tr>

                                                    <tr>
                                                        <th scope="row">Territory</th>
                                                        <td>{getSafe(() => detail.territory)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row"></th>
                                                        <td></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6-one">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">ADMIN DATA</th>
                                                    </tr>
                                                </thead>
                                                {managerDetails ? (
                                                    <tbody>
                                                        <tr>
                                                            <th scope="row">Manager Name</th>
                                                            <td>{getSafe(() => `${managerDetails.firstName} ${managerDetails.lastName}`)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Manager ID</th>
                                                            <td>{getSafe(() => managerDetails.professionalInfo[0].gpid)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Manager Job Title</th>
                                                            <td>{getSafe(() => managerDetails.professionalInfo[0].title)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Manager Work Phone</th>
                                                            <td>{getSafe(() => managerDetails.phoneNumbers[0].phoneNumber)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Manager Work Address</th>
                                                            <td>{getSafe(() => `${managerDetails.professionalInfo[0].locationAddrss1}, ${managerDetails.professionalInfo[0].locationCityName}, ${managerDetails.professionalInfo[0].locationCountryName}`)}</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope="row">Manager Email Address</th>
                                                            <td>{getSafe(() => managerDetails.emailAddresses[0].emailAddress)}</td>
                                                        </tr>
                                                    </tbody>
                                                ) : null}
                                            </table>
                                        </div>
                                        <div class="col-md-6-two">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2">CORPORATE DATA</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">Business Unit</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].buName)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Business Unit ID</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].buId)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Marketing Unit</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].muName)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Marketing Unit ID</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].muId)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Function</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].function)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Sub Function</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].subFunction)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Sector</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].sector)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Sector ID</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].sectorId)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Division</th>
                                                        <td>{getSafe(() => detail.professionalInfo[0].division)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Region</th>
                                                        <td>{getSafe(() => managerDetails.professionalInfo[0].region)}</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">Region ID</th>
                                                        <td>{getSafe(() => managerDetails.professionalInfo[0].regionId)}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    <div className="profile-buttons-bottom">
                        <Link to={`/chain-command?gpid=` + individualSearchResults[0].professionalInfo[0].gpid} onClick={handleChainAction}>
                            <button className="bottom-chain-command">
                                <i className="fas fa-users icon-buttom" title="Chain of Command"></i>Chain of Command
                            </button>
                        </Link>
                        <Link
                            to={`/direct-report?gpid=${individualSearchResults[0].professionalInfo[0].gpid}&level=${data.reporteesLevel}`}
                            onClick={handleLevelReportee}>
                            <button className="button-report">
                                <i className="fas fa-user-friends icon-buttom" title={`Direct Reports (${directReporteeCount})`}></i>Direct Reportees
                            </button>
                        </Link>
                        <Link to={'/'} onClick={handleProfileNewSearch}>
                            <button className="button-search">
                                <i className="fas fa-search" title="New Search"></i>Back to Search
                            </button>
                        </Link>
                    </div>
                </div>
            ) : (
                data.loader === 1 && individualSearchResults && individualSearchResults.length === 0 && <NotFoundError />
            )}
        </div>
    );
};

export default Profile;
