import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../state/reducer';
import { useSelector } from 'react-redux';
import Tree from './Tree';
import ExportReactCSV from './ExportReactCSV';
import NotFoundError from './NotFoundError';
import { navigate } from 'gatsby';
import { getSafe } from '../data/utils';


/**
 * ChainCommand Component
 * @constant
 * @type {function}
 * @returns {JSX}
 */

const ChainCommand = () => {
    const dispatch = useDispatch();
    const fileName = 'Chain of Command.csv';
    const data = useSelector(state => state.people);
    const allChainOfCommand = data.allChainOfCommand.result;
    const individualSearchResults = data.searchResults[0];
    const sortedAllChainCommand = allChainOfCommand && allChainOfCommand.sort((a, b) => a.level - b.level);
    const MAX_LEVEL = sortedAllChainCommand && sortedAllChainCommand.length > 0 && sortedAllChainCommand[0].level;
    const excelData =
        sortedAllChainCommand &&
        sortedAllChainCommand.map(result => ({
            Name: result.firstName,
            Type: result.empType === "External" || result.empType === "C" ? "C" : "E",
            'Job Title': result.hrTitle,
            GPID: result.gpid,
            Telephone: result.phone,
            Email: result.email,
            Sector: result.sector,
            Function: result.function,
            Country: result.country && result.country
        }));

    const handleFirstPlusDirectReportee = (result, isChild, level, parentNode, toggleFlag, levelState, childLevelState) => {
        /* Added below line to remove the Spinner from + and - button */
        dispatch(actions.setLoader(1));
        if (isChild) {
            dispatch(
                actions.getDirectReportee({
                    gpid: result.professionalInfo[0].gpid,
                    level: level,
                    isChild: isChild,
                    parentNode: parentNode,
                    toggleFlag: toggleFlag,
                    childLevelState: childLevelState
                })
            );
        } else {
            dispatch(
                actions.getDirectReportee({
                    gpid: result.gpid,
                    level: level,
                    isChild: isChild,
                    parentNode: null,
                    toggleFlag: toggleFlag,
                    levelState: levelState
                })
            );
        }
    };
    const handleEmployeeOnlyData = event => {
        if (event.target.checked) {
            dispatch(actions.setEmployeeOnlyFlag(true));
        } else {
            dispatch(actions.setEmployeeOnlyFlag(false));
        }
        dispatch(actions.updateChainOfCommand(event.target.checked));
    };

    const handleChainBack = () => {
        dispatch(actions.setEmployeeOnlyFlag(false));
        navigate('/');
    }

    useEffect(() => {
        const gpid = window.location.search.split('=')[1] || 0;
        dispatch(actions.getChainOfCommand(gpid));
    }, [dispatch]);

    return (
        <div>
            {data.loader === 0 && (
                <div className="suspense">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            )}

            {data.loader === 1 && allChainOfCommand && allChainOfCommand.length > 0 ? (
                <div className="chain-command">
                    <h2>
                        Corporate Hierarhy for <span>{`${getSafe(() => (individualSearchResults.firstName ?individualSearchResults.firstName:"")) } ${getSafe(() => (individualSearchResults.lastName))}`}</span>
                    </h2>
                    <div className="buttons-area-top">
                        <div className="all-checkbox" onClick={handleEmployeeOnlyData}>
                            <input type="checkbox" name="" id="employees" checked={data.employeeOnlyFlag} />
                            <label htmlFor="employees">Employees only</label>
                        </div>
                        {allChainOfCommand && <ExportReactCSV csvData={excelData} fileName={fileName} buttonText="Export to Excel" />}
                        <button className="bottom-search icon-bottom" style={{marginLeft: "10px"}} onClick={handleChainBack}>
                            <i className="fas fa-search"></i>Back to Search
                        </button>
                    </div>
                    <ul>
                        <li>
                            <div>Name</div>
                            <div>Type</div>
                            <div>Job Title</div>
                            <div>GPID</div>
                            <div>Telephone</div>
                            <div>Email</div>
                            <div>Sector</div>
                            <div>Function</div>
                            <div>Country</div>
                        </li>
                        {sortedAllChainCommand && sortedAllChainCommand.length > 0 ? (
                            sortedAllChainCommand.map(item => (
                                <Tree details={item} onIconClick={handleFirstPlusDirectReportee} state={''} maxLevel={MAX_LEVEL} />
                            ))
                        ) : (
                            <NotFoundError />
                        )}
                    </ul>
                    <div className="buttons-area-bottom">
                        <div className="all-checkbox" onClick={handleEmployeeOnlyData}>
                            <input type="checkbox" name="" id="employees" checked={data.employeeOnlyFlag} />
                            <label htmlFor="employees">Employees only</label>
                        </div>
                        {allChainOfCommand && <ExportReactCSV csvData={excelData} fileName={fileName} buttonText="Export to Excel" />}
                        <button className="bottom-search icon-bottom" style={{marginLeft: "10px"}} onClick={handleChainBack}>
                            <i className="fas fa-search"></i>Back to Search
                        </button>
                    </div>
                </div>
            ) : (
                data.loader === 1 && (allChainOfCommand && allChainOfCommand.length === 0) ?  <NotFoundError />
                : (data.loader === 1 && data.dataNotFound === true && <NotFoundError />)
            )}
        </div>
    );
};

export default ChainCommand;
