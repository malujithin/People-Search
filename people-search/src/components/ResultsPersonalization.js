import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../state/reducer';
import { useSelector } from 'react-redux';
import ExportReactCSV from './ExportReactCSV';
import { navigate } from 'gatsby';

/**
 * ResultsPersonalization Component
 * @constant
 * @type {function}
 * @returns {JSX}
 */

const ResultsPersonalization = () => {
    const dispatch = useDispatch();
    const SearchResultFileName = 'Search Results.csv';
    const DirectReporteeFineName = 'Direct Reportee.csv';
    const [selectedDelimeter, setSelectedDelimeter] = useState('None');
    const data = useSelector(state => state.people);
    const selectedOption = data.allPersonalizedColumn;
    const searchResults = data.searchResults;
    const allLevelReportee = data.allLevelReportee.result;
    const personalizedColumnList = data.personalizedColumnList;
    const [tempCancelItems, setTempCancelItems] = useState([]);
    const [tempUncheckItems, setUncheckItems] = useState([]);
    const [allCheckItems, setAllCheckItems] = useState([]);
    let directReporteeData,
        searchResultData = {};
    let allSelectedKey = selectedOption.map(option => option.name);

    let tempReportee = [];
    let tempAllLevelReportee = [];

    let reactPersonalizationForm = React.createRef();
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

    if (data.previousScreen === 6) {
        directReporteeData =
            dataForExcel &&
            dataForExcel.map(reportee => ({
                ...(allSelectedKey.includes('Type') && { 'Type': reportee.type && reportee.type }),
                ...(allSelectedKey.includes('First Name') && { 'First Name': reportee.firstName && reportee.firstName }),
                ...(allSelectedKey.includes('Job Title') && { 'Job Title': reportee.title && reportee.title }),
                ...(allSelectedKey.includes('GPID') && { 'GPID': reportee.gpid && reportee.gpid }),
                ...(allSelectedKey.includes('Work Phone') && { 'Work Phone': reportee.phoneNumber && reportee.phoneNumber }),
                ...(allSelectedKey.includes('Email') && { 'Email': reportee.emailAddress && reportee.emailAddress }),
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
                ...(allSelectedKey.includes('Work Address') && { 'Work Address': reportee.locationAddrss1 && reportee.locationAddrss1 }),
                ...(allSelectedKey.includes('Work Phone') && { 'Work Phone': reportee.number && reportee.number }),
                ...(allSelectedKey.includes('Desk Phone') && { 'Desk Phone': reportee.number && reportee.number }),
                ...(allSelectedKey.includes('Time Zone') && { 'Time Zone': reportee.locationTimezone && reportee.locationTimezone }),
                ...(allSelectedKey.includes('City') && { 'City': reportee.locationCityName && reportee.locationCityName })
            }));
    } else if (data.previousScreen === 2) {
        searchResultData =
            searchResults &&
            searchResults.map(result => ({
                ...(allSelectedKey.includes('Type') && { 'Type': result.employeeType }),
                ...(allSelectedKey.includes('First Name') && { 'First Name': result.firstName }),
                ...(allSelectedKey.includes('Job Title') && { 'Job Title': result.professionalInfo[0].title }),
                ...(allSelectedKey.includes('GPID') && { 'GPID': result.professionalInfo[0].gpid }),
                ...(allSelectedKey.includes('Work Phone') && { 'Work Phone': result.phoneNumbers[0].phoneNumber }),
                ...(allSelectedKey.includes('Email') && { 'Email': result.emailAddresses[0].emailAddress }),
                ...(allSelectedKey.includes('Sector') && { 'Sector': result.professionalInfo[0].sector }),
                ...(allSelectedKey.includes('Country') && { 'Country': result.professionalInfo[0].locationCountryName }),
                ...(allSelectedKey.includes('User Function') && { 'Function': result.professionalInfo[0].function }),
                ...(allSelectedKey.includes('Last Name') && { 'Last Name': result.lastName }),
                ...(allSelectedKey.includes('Middle Name') && { 'Middle Name': result.middleName }),
                ...(allSelectedKey.includes('Manager ID') && { 'Manager ID': result.professionalInfo[0].managerId }),
                ...(allSelectedKey.includes('Business Unit') && { 'Business Unit': result.professionalInfo[0].buName }),
                ...(allSelectedKey.includes('Marketing Unit') && { 'Marketing Unit': result.professionalInfo[0].muName }),
                ...(allSelectedKey.includes('Division') && { 'Division': result.professionalInfo[0].divisionId }),
                ...(allSelectedKey.includes('Region') && { 'Region': result.professionalInfo[0].region }),
                ...(allSelectedKey.includes('Work Address') && { 'Work Address': result.professionalInfo[0].locationAddrss1 }),
                ...(allSelectedKey.includes('Work Phone') && { 'Work Phone': result.phoneNumbers[0].phoneNumber }),
                ...(allSelectedKey.includes('Desk Phone') && { 'Desk Phone': result.phoneNumbers[1].phoneNumber }),
                ...(allSelectedKey.includes('Time Zone') && { 'Time Zone': result.professionalInfo[0].locationTimezone }),
                ...(allSelectedKey.includes('City') && { 'City': result.professionalInfo[0].locationCityName })
            }));
    }

    const handleCheckBox = (event, key) => {
        let tempSelectedOption = JSON.parse(JSON.stringify([...selectedOption]));
        let tempPersonalizedColumnList = JSON.parse(JSON.stringify([...personalizedColumnList]));
        let cancelItem = [...tempCancelItems];
        let checkValue = false;

        if (event.target.checked) {
            cancelItem.push(event.target.name)
            setTempCancelItems(cancelItem);
            for (var i = 0; i < tempPersonalizedColumnList.length; i++) {
                if (key === tempPersonalizedColumnList[i].key) {
                    tempPersonalizedColumnList[i].value = true;
                    tempSelectedOption.push({ name: tempPersonalizedColumnList[i].text, ...data.personalizedColumnList[i] });
                }
            }
            if(tempPersonalizedColumnList.filter(item => item.value).length === parseInt(26)){
                 checkValue = true;
            } else {
                checkValue = false;
            }
            
        } else {
            tempUncheckItems.push(event.target.name)
            setUncheckItems(tempUncheckItems);
            for (var j = 0; j < tempPersonalizedColumnList.length; j++) {
                if (key === tempPersonalizedColumnList[j].key) {
                    tempPersonalizedColumnList[j].value = false;
                    let indexSelected = parseInt(tempSelectedOption.findIndex(item => item.key === key))
                    tempSelectedOption.splice(indexSelected, 1);
                    
                }
                
            }
        }
        
        tempSelectedOption.sort((a, b) => a.sortingOrder - b.sortingOrder);
        dispatch(actions.setPersonalizedData(tempSelectedOption));
        dispatch(actions.updateResultPersonalization(tempPersonalizedColumnList));
        
        dispatch(actions.setAllCheck(checkValue));

    };

    const handleDelimeterButton = event => {
        setSelectedDelimeter(event.target.value);
    };
    const handlePersonalizeSubmit = () => {
        if (selectedDelimeter === 'None') {
            if (data.previousScreen === 6) {
                let gpid = searchResults[0].professionalInfo[0].gpid;
                dispatch(actions.getLevelReportee({ gpid: gpid, levelReports: data.reporteesLevel }));
                // dispatch(actions.setScreen(6))
                // navigate(`/direct-report`);
                navigate(`/direct-report?gpid=${gpid}&level=${data.reporteesLevel}`);
            } else if (data.previousScreen === 2 && searchResults) {
                if (searchResults.length > 1) {
                    if(!(Object.keys(data.formValues).every((k) => data.formValues[k] === ""))){
                        navigate(
                            '/search-results?' +
                                Object.entries(data.formValues)
                                    .filter(e => e[1])
                                    .map(e => e[0] + '=' + e[1])
                                    .join('&')
                        );
                    }
                    
                }
            }
        }
    };
    const handleAllCheckBox = event => {
        let tempSelectedOption = [...selectedOption];
        let tempSelectedOptionKey = tempSelectedOption.map(k => k.key);
        let tempPersonalizedColumnList = [...personalizedColumnList];
        
        if (event.target.checked) {
            allCheckItems.push(tempSelectedOption.map(k => k.name))
            
             setAllCheckItems(allCheckItems);
            dispatch(actions.setAllCheck(true));
            for (var i = 0; i < tempPersonalizedColumnList.length; i++) {
                if (tempPersonalizedColumnList[i].value !== true) {
                    tempPersonalizedColumnList[i].value = true;
                }
                if (tempPersonalizedColumnList[i].value === true) {
                    if (tempSelectedOptionKey.includes(tempPersonalizedColumnList[i].key) === false) {
                        tempSelectedOption.push({ name: tempPersonalizedColumnList[i].text, ...data.personalizedColumnList[i] });
                    }
                }
            }
        } else {
            dispatch(actions.setAllCheck(false));
            for (var j = 0; j < tempPersonalizedColumnList.length; j++) {
                tempPersonalizedColumnList[j].value = false;
            }
            tempSelectedOption = [];
        }
        // tempSelectedOption.sort((a, b) => a.sortingOrder - b.sortingOrder)
        dispatch(actions.setPersonalizedData(tempSelectedOption));
        dispatch(actions.updateResultPersonalization(tempPersonalizedColumnList));
    };
    const handleCheckBoxClear = () => {
        let tempSelectedOption = [...selectedOption];
        let tempPersonalizedColumnList = [...personalizedColumnList];


        for (var j = 0; j < tempPersonalizedColumnList.length; j++) {
            tempPersonalizedColumnList[j].value = false;
        }
        tempSelectedOption = [];
        dispatch(actions.setPersonalizedData(tempSelectedOption));
        dispatch(actions.updateResultPersonalization(tempPersonalizedColumnList));
        dispatch(actions.setAllCheck(false));
    };

    const handleBackButton = () => {
        let tempSelectedOption = [...selectedOption];
        let tempAllCheckItems = allCheckItems && allCheckItems[0];

        let tempPersonalizedColumnList = JSON.parse(JSON.stringify([...personalizedColumnList]));
        if(tempCancelItems && tempCancelItems.length) {
            for(let i = 0; i < tempPersonalizedColumnList.length; i++){
                for(let j = 0; j < tempCancelItems.length; j++){
                if(tempPersonalizedColumnList[i].text === tempCancelItems[j]){
                    tempPersonalizedColumnList[i].value = false;   
                    let indexBack = parseInt(tempSelectedOption.findIndex(item => item.name === tempCancelItems[j]))
                    tempSelectedOption.splice(indexBack, 1);                 
                }
                
            }
            }
        }
        
if(tempUncheckItems && tempUncheckItems.length) {
    for (let k = 0; k < tempPersonalizedColumnList.length; k++) {
        for(let l = 0; l < tempUncheckItems.length; l++){
            if(tempPersonalizedColumnList[k].text === tempUncheckItems[l]){
                tempPersonalizedColumnList[k].value = true;
            tempSelectedOption.push({ name: tempUncheckItems[l], ...data.personalizedColumnList[k]});

            }
            
        }
    }
}
if(tempAllCheckItems && tempAllCheckItems.length) {
    dispatch(actions.setAllCheck(false));
    let tempTexts = tempPersonalizedColumnList.map(a => a.text);
    let differenceValues = tempTexts.filter(x => !tempAllCheckItems.includes(x));
    for(let i = 0; i < tempPersonalizedColumnList.length; i++){
        for(let j = 0; j < differenceValues.length; j++){
        if(tempPersonalizedColumnList[i].text === differenceValues[j]){
            tempPersonalizedColumnList[i].value = false;   
            let indexAll = parseInt(tempSelectedOption.findIndex(item => item.name === differenceValues[j]))
            tempSelectedOption.splice(indexAll, 1);                 
        }
        
    }
    }

}
        dispatch(actions.setPersonalizedData(tempSelectedOption));
        dispatch(actions.updateResultPersonalization(tempPersonalizedColumnList));

        if (data.previousScreen === 2) {
            
            navigate(
                '/search-results?' +
                    Object.entries(data.formValues)
                        .filter(e => e[1])
                        .map(e => e[0] + '=' + e[1])
                        .join('&')
            );
            
            // dispatch(actions.setScreen(2));
        } else if (data.previousScreen === 6) {
            let gpid = searchResults[0].professionalInfo[0].gpid;
            navigate(`/direct-report?gpid=${gpid}&level=${data.reporteesLevel}`);
            
        }

    };

    return (
        <div className="results-personalization">
            <p>Select columns that you want included:</p>
            <form ref={reactPersonalizationForm}>
                <ul className="options">
                    {personalizedColumnList.map(item => {
                        return (
                            <li>
                                <input
                                    type="checkbox"
                                    value=""
                                    id={item.key}
                                    name={item.text}
                                    checked={item.value}
                                    onChange={evt => handleCheckBox(evt, item.key)}
                                />
                                <label htmlFor={item.key}>{item.text!== "Name" ? item.text : "First Name"}</label>
                            </li>
                        );
                    })}
                </ul>
            </form>
            <ul className="delimeter">
                <li>
                    <label htmlFor="option1">Delimiter:</label>
                </li>
                <li>
                    <input
                        type="radio"
                        name="delimiter"
                        id="del1"
                        value="None"
                        checked={selectedDelimeter === 'None'}
                        onChange={handleDelimeterButton}
                    />
                    <label htmlFor="del1">None (.html)</label>
                </li>

                <li>
                    <input
                        type="radio"
                        name="delimiter"
                        id="del4"
                        value="Excel"
                        checked={selectedDelimeter === 'Excel'}
                        onChange={handleDelimeterButton}
                    />
                    <label htmlFor="del4">Excel</label>
                </li>
            </ul>
            <div className="bottom-form">
                <div className="all-checkbox">
                    <input type="checkbox" name="all" id="all1" onClick={handleAllCheckBox} checked={data.allChecked} />
                    <label htmlFor="all1">All Check</label>
                </div>
                {searchResults && selectedDelimeter === 'Excel' ? (
                    <ExportReactCSV
                        csvData={data.previousScreen === 2 ? searchResultData : data.previousScreen === 6 ? directReporteeData : null}
                        fileName={data.previousScreen === 2 ? SearchResultFileName : data.previousScreen === 6 ? DirectReporteeFineName : null}
                        buttonText="Submit"></ExportReactCSV>
                ) : (
                    <button
                        className="bottom-search"
                        disabled={data.personalizedColumnList.filter(a => a.value).length === 0}
                        onClick={handlePersonalizeSubmit}>
                        Submit
                    </button>
                )}

                <button className="button-clear-form" onClick={handleCheckBoxClear}>
                    <i className="far fa-trash-alt"></i> Clear Form
                </button>
                <button className="bottom-search" onClick={handleBackButton}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ResultsPersonalization;
