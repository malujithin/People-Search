import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../state/reducer';
import { useSelector } from 'react-redux';
import { navigate } from 'gatsby';

/**
 * SearchForm Component
 * @constant
 * @type {function}
 * @returns {JSX}
 */

const SearchForm = () => {
    const data = useSelector(state => state.people);
    const [showAdvancedForm, setShowAdvancedForm] = useState(false);
    const [handleChangeStarted, setHandleChangeStarted] = useState(false);
    

    const formValues = data.formValues;
    // const [param, setParam] = useState(formValues);
    const dispatch = useDispatch();

    const handleChange = event => {
        // setHandleChangeStarted(true);
        
        dispatch(actions.setSearchForm({ ...formValues, [event.target.name]: event.target.value }));
        
    };

    const checkInput = () => {
            if(Object.keys(formValues).every((k) => formValues[k].trim() === "")){
                return true;
            } else {
                return false;
            }
    }

    useEffect(() => {
        if(checkInput()){
            setHandleChangeStarted(false)
        } else {
            setHandleChangeStarted(true)
        }
        
    }, [formValues])

    const handleClearButton = e => {
        dispatch(actions.clearSearchForm());

        e.preventDefault();
    };

    const handleSubmit = e => {
        e.preventDefault();
        navigate(
            '/search-results?' +
                Object.entries(formValues)
                    .filter(e => e[1])
                    .map(e => e[0] + '=' + e[1])
                    .join('&')  
        );
        dispatch(actions.setPreviousScreen(1));
    };

    const handleAdvancedSearchForm = () => {
        setShowAdvancedForm(true);
        if (showAdvancedForm) {
            setShowAdvancedForm(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="search-form">
                    <ul className="form">
                        <li>
                            <div className="col-1">First Name</div>
                            <div className="col-2">
                                <input type="text" name="firstName" value={formValues.firstName} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-3">Secondary First Name</div>
                            <div className="col-4">
                                <input type="text" name="secondFirstName" value={formValues.secondFirstName} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-1">Last Name</div>
                            <div className="col-2">
                                <input type="text" name="lastName" value={formValues.lastName} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-3">Secondary Last Name</div>
                            <div className="col-4">
                                <input type="text" name="secondLastName" value={formValues.secondLastName} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-1">GPID</div>
                            <div className="col-2">
                                <input type="number" name="GPID" value={formValues.GPID} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-3">Manager ID</div>
                            <div className="col-4">
                                <input type="text" name="managerID" value={formValues.managerID} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <label className="col-1">Email</label>
                            <div className="col-2">
                                <input type="email" name="emailAddress" value={formValues.emailAddress} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-3">Work Phone</div>
                            <div className="col-4">
                                <input type="number" name="workPhone" value={formValues.workPhone} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-1">Work Address</div>
                            <div className="col-2">
                                <input type="text" name="workAddress" value={formValues.workAddress} onChange={handleChange} />
                            </div>
                        </li>
                        <li>
                            <div className="col-3">City</div>
                            <div className="col-4">
                                <input type="text" name="city" value={formValues.city} onChange={handleChange} />
                            </div>
                        </li>
                    {/* </ul> */}
                    {showAdvancedForm ? 
                        // <ul className="form"> 
                        <>
                            <li>
                                <div className="col-1">Middle Name</div>
                                <div className="col-2">
                                    <input type="text" name="middleName" value={formValues.middleName} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-3">Desk Phone</div>
                                <div className="col-4">
                                    <input type="number" name="deskPhone" value={formValues.deskPhone} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-1">Sector</div>
                                <div className="col-2">
                                    <input type="text" name="sector" value={formValues.sector} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-3">Job Title</div>
                                <div className="col-4">
                                    <input type="text" name="jobTitle" value={formValues.jobTitle} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-1">Region</div>
                                <div className="col-2">
                                    <input type="text" name="region" value={formValues.region} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-3">Territory</div>
                                <div className="col-4">
                                    <input type="text" name="territory" value={formValues.territory} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-1">Function</div>
                                <div className="col-2">
                                    <input type="text" name="userFunction" value={formValues.userFunction} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-3">Sub Function</div>
                                <div className="col-4">
                                    <input type="text" name="subFunction" value={formValues.subFunction} onChange={handleChange} />
                                </div>
                            </li>

                            <li>
                                <div className="col-1">Country</div>
                                <div className="col-2">
                                    <input type="text" name="country" value={formValues.country} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-3">Business Unit</div>
                                <div className="col-4">
                                    <input type="text" name="businessUnit" value={formValues.businessUnit} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-1">Marketing Unit</div>
                                <div className="col-2">
                                    <input type="text" name="marketingUnit" value={formValues.marketingUnit} onChange={handleChange} />
                                </div>
                            </li>
                            <li>
                                <div className="col-3">Division</div>
                                <div className="col-4">
                                    <input type="text" name="division" value={formValues.division} onChange={handleChange} />
                                </div>
                            </li>

                            <li>
                                <div className="col-3"></div>
                                <div className="col-4"></div>
                            </li>
                        
                        </>
                     : null}
                    </ul>
                    <div className="link" onClick={handleAdvancedSearchForm}>
                        Advanced Search <i className={showAdvancedForm ? 'fa fa-chevron-up' : 'fa fa-chevron-down'} aria-hidden="true"></i>
                    </div>
                    <div className="bottom-form">
                        <button type="submit" className="bottom-search" onClick={handleSubmit} disabled={!handleChangeStarted}>
                            <i className="fas fa-search"></i> Search
                        </button>
                        <button className="button-clear-form" onClick={handleClearButton}>
                            <i className="far fa-trash-alt"></i> Clear Form
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SearchForm;
