import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { actions } from '../state/reducer';
import { getSafe } from '../data/utils';
import { useSelector } from 'react-redux';
import ExportReactCSV from './ExportReactCSV';
import NotFoundError from './NotFoundError';
import { Link, navigate } from 'gatsby';

/**
 * DirectReport Component
 * @constant
 * @type {function}
 * @returns {JSX}
 */

const DirectReport = () => {
    let directReportFileName = 'Direct Reportees.csv';
    const dispatch = useDispatch();
    const data = useSelector(state => state.people);
    const [dropDownLevel, setDropDownLevel] = useState(1);
    const individualSearchResults = data.searchResults[0];
    const allLevelReportee = data.allLevelReportee.result;
    const selectedOption = data.allPersonalizedColumn;
    let tempAllLevelReportee = [];
    const tempReportee = [];
    let allSelectedKey = selectedOption.map(option => option.name);

    if (allLevelReportee) {
        tempAllLevelReportee = [...allLevelReportee];
    }

    for (let i = 0; i < tempAllLevelReportee.length; i++) {
        if (tempAllLevelReportee[i].hasOwnProperty('directReportees')) {
            for (let j = 0; j < tempAllLevelReportee[i].directReportees.length; j++) {
                tempReportee.push(tempAllLevelReportee[i].directReportees[j]);
            }
        }
    }
    const dataForExcel = [...tempAllLevelReportee, ...tempReportee];

    const defaultSelectedOption = [...selectedOption];
    if (parseInt(defaultSelectedOption.length) === 0) {
        for (var i = 0; i < data.personalizedColumnList.length; i++) {
            if (data.personalizedColumnList[i].value === true) {
                defaultSelectedOption.push({ name: data.personalizedColumnList[i].text, ...data.personalizedColumnList[i] });
            }
        }
        defaultSelectedOption.sort((a, b) => a.sortingOrder - b.sortingOrder);
        dispatch(actions.setPersonalizedData(defaultSelectedOption));
    }

    const directReporteeData =
        dataForExcel &&
        dataForExcel.map(reportee => ({
            ...(allSelectedKey.includes('Type') && { 'Type': reportee.empType && reportee.empType === "External" || reportee.empType === "C" ? "C" : "E" }),
            ...(allSelectedKey.includes('First Name') && { 'First Name': reportee.firstName && reportee.firstName }),
            ...(allSelectedKey.includes('Job Title') && { 'Job Title': reportee.hrTitle && reportee.hrTitle }),
            ...(allSelectedKey.includes('GPID') && { 'GPID': reportee.gpid && reportee.gpid }),
            ...(allSelectedKey.includes('Email') && { 'Email': reportee.email && reportee.email }),
            ...(allSelectedKey.includes('Sector') && { 'Sector': reportee.sector && reportee.sector }),
            ...(allSelectedKey.includes('Country') && { 'Country': reportee.locationCountryName && reportee.locationCountryName }),
            ...(allSelectedKey.includes('User Function') && { 'Function': reportee.function && reportee.function }),
            ...(allSelectedKey.includes('Last Name') && { 'Last Name': reportee.lastName && reportee.lastName }),
            ...(allSelectedKey.includes('Middle Name') && { 'Middle Name': reportee.middleName && reportee.middleName }),
            ...(allSelectedKey.includes('Manager ID') && { 'Manager ID': reportee.managerId && reportee.managerId }),
            ...(allSelectedKey.includes('Business Unit') && { 'Business Unit': reportee.buName && reportee.buName }),
            ...(allSelectedKey.includes('Marketing Unit') && { 'Marketing Unit': reportee.muName && reportee.muName }),
            ...(allSelectedKey.includes('Division') && { 'Division': reportee.divisionId && reportee.divisionId }),
            ...(allSelectedKey.includes('Region') && { 'Region': reportee.region && reportee.region }),
            ...(allSelectedKey.includes('Work Address') && { 'Work Address': reportee.address && reportee.address }),
            ...(allSelectedKey.includes('Work Phone') && { 'Work Phone': reportee.phone && reportee.phone }),
            ...(allSelectedKey.includes('Desk Phone') && { 'Desk Phone': reportee.deskPhone && reportee.deskPhone }),
            ...(allSelectedKey.includes('Time Zone') && { 'Time Zone': reportee.locationTimezone && reportee.locationTimezone }),
            ...(allSelectedKey.includes('City') && { 'City': reportee.locationCityName && reportee.locationCityName })
        }));

    const handleChange = event => {
        setDropDownLevel(event.target.value);
        dispatch(actions.setReporteesLevel(event.target.value));
    };

    const handleGoUpLevel = () => {
        // dispatch(actions.setLevelChange(true));
        // if (data.currentLevel == data.maxLevel) {
        //     dispatch(actions.updateDirectLevelReportee(data.currentLevel - 1));
        // } else if (allLevelReportee[0].level == 1) {
        //     dispatch(actions.getUpLevelReportee({ gpid: allLevelReportee[0].gpid, currentLevel: allLevelReportee[0].level }));
        // } else {
        //     dispatch(actions.getUpLevelReportee({ gpid: allLevelReportee[0].gpid, currentLevel: 1 }));
        // }
        if (dropDownLevel > 1) {
            dispatch(actions.setReporteesLevel(parseInt(dropDownLevel) - 1));
        }
    };

    useEffect(() => {
        dispatch(actions.setPersonalizedData([]));
        setDropDownLevel(data.reporteesLevel);
        if (data.searchResults) {
            const gpid = window.location.search.split('=')[1].split('&')[0] || 0;
            const level = data.reporteesLevel;
            dispatch(actions.getLevelReportee({ gpid: gpid, levelReports: level }));
        }
    }, [data.reporteesLevel]);

    // const getMenuItem = max => {
    // 	let menuItem = [];
    // 	for (let i = 1; i <= max; i++) {
    // 		menuItem.push(<MenuItem value={i}>Level {i}</MenuItem>);
    // 	}
    // 	return menuItem;
    // }
    const handleDirectReporteeNewSearch = () => {
        dispatch(actions.setPersonalizedData([]));
        dispatch(actions.updateResultPersonalization());
        dispatch(actions.setAllCheck(true));
        dispatch(actions.setEmployeeOnlyFlag(false));


        // dispatch(actions.setScreen(1));
        navigate('/');
    };

    const handleReporteeData = result => {
        const gpid = result.gpid;
        dispatch(actions.getIndividualDetail(gpid));
        dispatch(actions.setScreen(4));
    };

    const handlePrepareResults = () => {
        dispatch(actions.clearCheckForm());
        // dispatch(actions.setScreen(3));
        dispatch(actions.setPreviousScreen(6));
    };
    const handleAllEmployeeClick = event => {
        if (event.target.checked) {
            dispatch(actions.setEmployeeOnlyFlag(true));
        } else {
            dispatch(actions.setEmployeeOnlyFlag(false));
        }
        dispatch(actions.updateAllEmployeeReportee(event.target.checked));
    };

    return (
        <div>
            {data.loader === 0 && (
                <div className="suspense">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            )}
                <div className="direct-report">
                    <h2>
                        Organizational listing for <span>{`${individualSearchResults && individualSearchResults.firstName} ${ individualSearchResults && individualSearchResults.lastName}`}</span>
                    </h2>
                    <div className="buttons-area-top">
                        <div className="all-checkbox" onClick={handleAllEmployeeClick}>
                            <input type="checkbox" name="" id="employees2" checked={data.employeeOnlyFlag} disabled={data.reporteesLevel && parseInt(data.reporteesLevel) === 0} />
                            <label htmlFor="employees2">Employees only</label>
                        </div>
                        <button className="bottom-go-up_level" onClick={handleGoUpLevel} disabled={(parseInt(dropDownLevel) === 1) || (data.reporteesLevel && parseInt(data.reporteesLevel) === 0)}>
                            <i className="fas fa-level-up-alt"></i> Go Up 1 level
                        </button>

                        <button className="bottom-level">
                            <i className="fas fa-window-restore"></i>
                            {/* {data.currentLevel ? ( */}
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dropDownLevel} onChange={handleChange} disabled={data.reporteesLevel && parseInt(data.reporteesLevel) === 0}>
                                {/* {getMenuItem(data.maxLevel)} */}
                                <MenuItem value={1}>Level 1</MenuItem>
                                <MenuItem value={2}>Level 2</MenuItem>
                                <MenuItem value={3}>Level 3</MenuItem>
                                <MenuItem value={4}>Level 4</MenuItem>
                                <MenuItem value={5}>Level 5</MenuItem>
                                <MenuItem value={6}>Level 6</MenuItem>
                                <MenuItem value={7}>Level 7</MenuItem>
                                <MenuItem value={8}>Level 8</MenuItem>
                                <MenuItem value={9}>Level 9</MenuItem>
                                <MenuItem value={10}>Level 10</MenuItem>
                                <MenuItem value={11}>Level 11</MenuItem>
                                <MenuItem value={12}>Level 12</MenuItem>
                                {/* {[...Array(12)].map((value, index) =>{
                                    return<MenuItem value={index+ 1}>Level {index + 1}</MenuItem>
                                })} */}
                            </Select>
                            {/* ) : null} */}
                        </button>
                        {allLevelReportee && <ExportReactCSV csvData={directReporteeData} fileName={directReportFileName} buttonText="Export to Excel" disabled={ allLevelReportee && allLevelReportee.length === 0} />}
                        <Link to="/personalization" onClick={handlePrepareResults}>
                            <button className="bottom-export icon-bottom" disabled={(allLevelReportee && allLevelReportee.length === 0) || (data.reporteesLevel && parseInt(data.reporteesLevel) === 0)}>
                                <i className="fas fa-cog"></i>Personalize Results
                            </button>
                        </Link>

                        <button className="bottom-search icon-bottom" onClick={handleDirectReporteeNewSearch}>
                            <i className="fas fa-search"></i>Back to Search
                        </button>
                    </div>
                    <ul>
                        <li>
                            {selectedOption &&
                                selectedOption.map(option => {
                                    return <div className={option.name === 'Type' ? 'type-width' : ''}>{option.name}</div>;
                                })}
                        </li>
                        {data.loader === 1 && allLevelReportee && allLevelReportee.length > 0 ?
                            allLevelReportee.map(reportee => {
                                return (
                                    // length <1 ? <div>error</div> :
                                    <>
                                        <li>
                                            {selectedOption &&
                                                selectedOption.map(option => {
                                                    return (
                                                        <>
                                                            {option.key === 'firstName' && (
                                                                <div>
                                                                    <span
                                                                        className="link"
                                                                        title={`${getSafe(() => reportee.firstName)} ${getSafe(() =>
                                                                            reportee.lastName ? reportee.lastName : ''
                                                                        )}`}
                                                                        onClick={() => handleReporteeData(reportee)}>{`${getSafe(
                                                                        () => reportee.firstName
                                                                    )} ${getSafe(() => (reportee.lastName ? reportee.lastName : ''))}`}</span>
                                                                </div>
                                                            )}
                                                            {option.key === 'type' && (
                                                                <div className="type-width">
                                                                    {getSafe(() => (reportee.empType === 'External' ? 'C' : 'E'))}
                                                                </div>
                                                            )}
                                                            {option.key === 'lastName' && <div>{getSafe(() => reportee.lastName)}</div>}
                                                            {option.key === 'middleName' && <div>{getSafe(() => reportee.middleName)}</div>}
                                                            {option.key === 'secondFirstName' && <div>{getSafe(() => reportee.secFName)}</div>}
                                                            {option.key === 'secondLastName' && <div>{getSafe(() => reportee.secondLastName)}</div>}
                                                            {option.key === 'prefFirstName' && <div>{getSafe(() => reportee.prefName)}</div>}
                                                            {option.key === 'prefLastName' && <div>{getSafe(() => reportee.prefLName)}</div>}
                                                            {option.key === 'GPID' && (
                                                                <div>
                                                                    <span className="link" onClick={() => handleReporteeData(reportee)}>
                                                                        {getSafe(() => reportee.gpid)}
                                                                    </span>
                                                                </div>
                                                            )}
                                                            {option.key === 'managerID' && <div>{getSafe(() => reportee.managerId)}</div>}
                                                            {option.key === 'businessUnit' && <div>{getSafe(() => reportee.businessUnit)}</div>}
                                                            {option.key === 'marketingUnit' && <div>{getSafe(() => reportee.marketingUnit)}</div>}
                                                            {option.key === 'division' && <div>{getSafe(() => reportee.division)}</div>}
                                                            {option.key === 'sector' && (
                                                                <div title={reportee.sector}>{getSafe(() => reportee.sector)}</div>
                                                            )}
                                                            {option.key === 'jobTitle' && (
                                                                <div title={reportee.hrTitle}>{getSafe(() => reportee.hrTitle)}</div>
                                                            )}
                                                            {option.key === 'region' && <div>{getSafe(() => reportee.region)}</div>}
                                                            {option.key === 'territory' && <div>{getSafe(() => reportee.territory)}</div>}
                                                            {option.key === 'userFunction' && <div>{getSafe(() => reportee.function)}</div>}
                                                            {option.key === 'subFunction' && <div>{getSafe(() => reportee.subFunction)}</div>}
                                                            {option.key === 'workPhone' && <div>{getSafe(() => reportee.phone)}</div>}
                                                            {option.key === 'deskPhone' && <div>{getSafe(() => reportee.deskPhone)}</div>}
                                                            {option.key === 'fax' && <div>{getSafe(() => reportee.fax)}</div>}
                                                            {option.key === 'workAddress' && (
                                                                <div title={reportee.address}>{`${getSafe(() => reportee.address)}, ${getSafe(
                                                                    () => reportee.country
                                                                )}`}</div>
                                                            )}
                                                            {option.key === 'city' && <div>{getSafe(() => reportee.city)}</div>}
                                                            {option.key === 'country' && <div>{getSafe(() => reportee.country)}</div>}
                                                            {option.key === 'timeZone' && <div>{getSafe(() => reportee.timeZone)}</div>}
                                                            {option.key === 'Email' && (
                                                                <div title={reportee.email}>
                                                                    <a href={`mailto:${reportee.email}`}>{getSafe(() => reportee.email)}</a>
                                                                </div>
                                                            )}
                                                        </>
                                                    );
                                                })}
                                        </li>

                                        {reportee.directReportees &&
                                            reportee.directReportees.map(dr => {
                                                return (
                                                    <li>
                                                        {selectedOption &&
                                                            selectedOption.map(option => {
                                                                return (
                                                                    <>
                                                                        {option.key === 'firstName' && dr.firstName && (
                                                                            <div
                                                                                title={`${getSafe(() => reportee.firstName)} ${getSafe(() =>
                                                                                    reportee.lastName ? reportee.lastName : ''
                                                                                )}`}>
                                                                                <Link
                                                                                    className="link-name"
                                                                                    to={`/profile?gpid=` + getSafe(() => dr.gpid)}>
                                                                                    {`${getSafe(() => dr.firstName)} ${getSafe(() =>
                                                                                        dr.middleName ? dr.middleName : ''
                                                                                    )} ${getSafe(() => dr.lastName)}`}
                                                                                </Link>
                                                                            </div>
                                                                        )}
                                                                        {option.key === 'type' && (
                                                                            <div className="type-width">
                                                                                {getSafe(() => (dr.empType === 'External' ? 'C' : 'E'))}
                                                                            </div>
                                                                        )}
                                                                        {option.key === 'lastName' && <div>{getSafe(() => dr.lastName)}</div>}
                                                                        {option.key === 'middleName' && <div>{getSafe(() => dr.middleName)}</div>}
                                                                        {option.key === 'secondFirstName' && (
                                                                            <div>{getSafe(() => dr.secondFirstName)}</div>
                                                                        )}
                                                                        {option.key === 'secondLastName' && (
                                                                            <div>{getSafe(() => dr.secondLastName)}</div>
                                                                        )}
                                                                        {option.key === 'prefFirstName' && (
                                                                            <div>{getSafe(() => dr.prefFirstName)}</div>
                                                                        )}
                                                                        {option.key === 'prefLastName' && <div>{getSafe(() => dr.prefLastName)}</div>}
                                                                        {option.key === 'GPID' && (
                                                                            <div>
                                                                                <Link to={`/profile?gpid=` + getSafe(() => dr.gpid)}>
                                                                                    {getSafe(() => dr.gpid)}
                                                                                </Link>
                                                                            </div>
                                                                        )}
                                                                        {option.key === 'managerID' && <div>{getSafe(() => dr.managerID)}</div>}
                                                                        {option.key === 'businessUnit' && <div>{getSafe(() => dr.businessUnit)}</div>}
                                                                        {option.key === 'marketingUnit' && (
                                                                            <div>{getSafe(() => dr.marketingUnit)}</div>
                                                                        )}
                                                                        {option.key === 'division' && <div>{getSafe(() => dr.division)}</div>}
                                                                        {option.key === 'sector' && <div>{getSafe(() => dr.sector)}</div>}
                                                                        {option.key === 'jobTitle' && (
                                                                            <div title={reportee.hrTitle}>{getSafe(() => dr.hrTitle)}</div>
                                                                        )}
                                                                        {option.key === 'region' && <div>{getSafe(() => dr.region)}</div>}
                                                                        {option.key === 'territory' && <div>{getSafe(() => dr.territory)}</div>}
                                                                        {option.key === 'userFunction' && <div>{getSafe(() => dr.userFunction)}</div>}
                                                                        {option.key === 'subFunction' && <div>{getSafe(() => dr.subFunction)}</div>}
                                                                        {option.key === 'workPhone' && <div>{getSafe(() => dr.phone)}</div>}
                                                                        {option.key === 'deskPhone' && <div>{getSafe(() => dr.deskPhone)}</div>}
                                                                        {option.key === 'fax' && <div>{getSafe(() => dr.fax)}</div>}
                                                                        {option.key === 'workAddress' && (
                                                                            <div title={reportee.address}>{getSafe(() => dr.address)}</div>
                                                                        )}
                                                                        {option.key === 'city' && <div>{getSafe(() => dr.city)}</div>}
                                                                        {option.key === 'country' && <div>{getSafe(() => dr.country)}</div>}
                                                                        {option.key === 'timeZone' && <div>{getSafe(() => dr.timeZone)}</div>}
                                                                        {option.key === 'Email' && (
                                                                            <div title={reportee.email}>
                                                                                <a href={`mailto:${dr.email}`}>{getSafe(() => dr.email)}</a>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                );
                                                            })}
                                                    </li>
                                                );
                                            })}
                                    </>
                                );
                            })
                     : (
                        data.loader === 1 && (allLevelReportee && allLevelReportee.length === 0) ?  <NotFoundError />
                        : (data.loader === 1 && data.dataNotFound === true && <NotFoundError />)
                    )}
                    </ul>
                    
                    <div className="buttons-area-bottom">
                        <div className="all-checkbox" onClick={handleAllEmployeeClick}>
                            <input type="checkbox" name="" id="employees2" checked={data.employeeOnlyFlag} disabled={data.reporteesLevel && parseInt(data.reporteesLevel) === 0} />
                            <label htmlFor="employees2">Employees only</label>
                        </div>
                        <button className="bottom-go-up_level" onClick={handleGoUpLevel} disabled={parseInt(dropDownLevel) === 1 || data.reporteesLevel && parseInt(data.reporteesLevel) === 0}>
                            <i className="fas fa-level-up-alt"></i> Go Up 1 level
                        </button>

                        <button className="bottom-level">
                            <i className="fas fa-window-restore"></i>
                            {/* {data.currentLevel ? ( */}
                            <Select labelId="demo-simple-select-label" id="demo-simple-select" value={dropDownLevel} onChange={handleChange} disabled={data.reporteesLevel && parseInt(data.reporteesLevel) === 0}>
                                {/* {getMenuItem(data.maxLevel)} */}
                                <MenuItem value={1}>Level 1</MenuItem>
                                <MenuItem value={2}>Level 2</MenuItem>
                                <MenuItem value={3}>Level 3</MenuItem>
                                <MenuItem value={4}>Level 4</MenuItem>
                                <MenuItem value={5}>Level 5</MenuItem>
                                <MenuItem value={6}>Level 6</MenuItem>
                                <MenuItem value={7}>Level 7</MenuItem>
                                <MenuItem value={8}>Level 8</MenuItem>
                                <MenuItem value={9}>Level 9</MenuItem>
                                <MenuItem value={10}>Level 10</MenuItem>
                                <MenuItem value={11}>Level 11</MenuItem>
                                <MenuItem value={12}>Level 12</MenuItem>
                            </Select>
                            {/* ) : null} */}
                        </button>
                        {allLevelReportee && <ExportReactCSV csvData={directReporteeData} fileName={directReportFileName} buttonText="Export to Excel"  disabled={allLevelReportee && allLevelReportee.length === 0}/>}
                        <Link to="/personalization" onClick={handlePrepareResults}>
                            <button className="bottom-export icon-bottom" disabled={(allLevelReportee && allLevelReportee.length === 0) || (data.reporteesLevel && parseInt(data.reporteesLevel) === 0)}>
                                <i className="fas fa-cog"></i>Personalize Results
                            </button>
                        </Link>
                        <button className="bottom-search icon-bottom" onClick={handleDirectReporteeNewSearch}>
                            <i className="fas fa-search"></i>Back to Search
                        </button>
                    </div>
                </div>
            
        </div>
    );
};

export default DirectReport;

