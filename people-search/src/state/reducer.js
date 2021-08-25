const initialState = {
    searchResults: [],
    directReporteeCount: [],
    allChainOfCommand: [],
    allChainOfCommandOriginalList: [],
    allChildChainOfCommand: [],
    currentOriginalList: [],
    allEmployeeLengthCheck: false,
    employeeOnlyFlag: false,
    allPersonalizedColumn: [],
    originalAllPersonalizedColumn: [],
    allLevelReportee: [],
    allLevelReporteeOriginalList: [],
    allUpLevelReporteeOriginalList: [],
    managerDetails: [],
    levelChanged: false,
    screen: 1,
    reporteesLevel: 0,
    previousScreen: 0,
    loader: 0,
    dataNotFound: false,
    searchForm: {},
    results: [],
    resultsOptions: [],
    delimiterOption: 4,
    profile: {},
    chainOfcommand: [],
    directRaport: [],
    level: 1,
    loggedInUser: '',
    userPhoto: '',
    logoutUser: '',
    uploadClicked: false,
    allChecked: false,
    personalizedColumnList: [
        {
            key: 'type',
            text: 'Type',
            value: true,
            sortingOrder: 1
        },
        {
            key: 'firstName',
            text: 'Name',
            value: true,
            sortingOrder: 2
        },
        {
            key: 'lastName',
            text: 'Last Name',
            value: false,
            sortingOrder: 4
        },
        {
            key: 'middleName',
            text: 'Middle Name',
            value: false,
            sortingOrder: 3
        },
        {
            key: 'secondFirstName',
            text: 'Secondary First Name',
            value: false,
            sortingOrder: 19
        },
        {
            key: 'secondLastName',
            text: 'Secondary Last Name',
            value: false,
            sortingOrder: 20
        },
        {
            key: 'prefFirstName',
            text: 'Preferred First Name',
            value: false,
            sortingOrder: 21
        },
        {
            key: 'prefLastName',
            text: 'Preferred Last Name',
            value: false,
            sortingOrder: 22
        },
        {
            key: 'jobTitle',
            text: 'Job Title',
            value: true,
            sortingOrder: 5
        },
        {
            key: 'GPID',
            text: 'GPID',
            value: true,
            sortingOrder: 6
        },
        {
            key: 'workPhone',
            text: 'Work Phone',
            value: true,
            sortingOrder: 8
        },
        {
            key: 'Email',
            text: 'Email',
            value: true,
            sortingOrder: 7
        },
        {
            key: 'sector',
            text: 'Sector',
            value: true,
            sortingOrder: 9
        },
        // {
        //     key: 'country',
        //     text: 'Country',
        //     value: false,
        //     sortingOrder: 12
        // },
        {
            key: 'userFunction',
            text: 'Dept.',
            value: true,
            sortingOrder: 13
        },
        {
            key: 'managerID',
            text: 'Manager ID',
            value: false
        },
        {
            key: 'businessUnit',
            text: 'Business Unit',
            value: false,
            sortingOrder: 14
        },
        {
            key: 'marketingUnit',
            text: 'Marketing Unit',
            value: false,
            sortingOrder: 15
        },
        {
            key: 'division',
            text: 'Division',
            value: false,
            sortingOrder: 16
        },

        {
            key: 'region',
            text: 'Region',
            value: false,
            sortingOrder: 17
        },
        {
            key: 'territory',
            text: 'Territory',
            value: false,
            sortingOrder: 18
        },

        {
            key: 'subFunction',
            text: 'Sub Function',
            value: false,
            sortingOrder: 23
        },

        {
            key: 'deskPhone',
            text: 'Desk Phone',
            value: false,
            sortingOrder: 24
        },
        {
            key: 'fax',
            text: 'FAX',
            value: false,
            sortingOrder: 25
        },
        {
            key: 'workAddress',
            text: 'Work Address',
            value: false,
            sortingOrder: 10
        },
        {
            key: 'city',
            text: 'City',
            value: false,
            sortingOrder: 11
        },

        {
            key: 'timeZone',
            text: 'Time Zone',
            value: false,
            sortingOrder: 26
        }
    ],
    personalizedColumn: {
        firstName: true,
        lastName: false,
        middleName: false,
        secondFirstName: false,
        secondLastName: false,
        prefFirstName: false,
        prefLastName: false,
        GPID: true,
        managerID: true,
        businessUnit: false,
        marketingUnit: false,
        division: false,
        sector: true,
        jobTitle: true,
        region: false,
        territory: false,
        userFunction: true,
        subFunction: false,
        workPhone: true,
        deskPhone: false,
        fax: false,
        workAddress: true,
        city: false,
        // country: true,
        timeZone: false
    },
    formValues: {
        firstName: '',
        secondFirstName: '',
        lastName: '',
        secondLastName: '',
        middleName: '',
        GPID: '',
        emailAddress: '',
        workPhone: '',
        deskPhone: '',
        sector: '',
        jobTitle: '',
        region: '',
        territory: '',
        userFunction: '',
        subFunction: '',
        workAddress: '',
        city: '',
        managerID: '',
        country: '',
        businessUnit: '',
        marketingUnit: '',
        division: ''
    }
};

const GET_SEARCH_RESULTS = 'GET_SEARCH_RESULTS';
const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
const GET_INDIVIDUAL_DETAILS = 'GET_INDIVIDUAL_DETAILS';
const SET_INDIVIDUAL_DETAILS = 'SET_INDIVIDUAL_DETAILS';
const GET_DIRECT_REPORTEE_COUNT = 'GET_DIRECT_REPORTEE_COUNT';
const SET_DIRECT_REPORTEE_COUNT = 'SET_DIRECT_REPORTEE_COUNT';
const GET_DIRECT_REPORTEE = 'GET_DIRECT_REPORTEE';
const SET_DIRECT_REPORTEE = 'SET_DIRECT_REPORTEE';
const GET_CHAIN_OF_COMMAND = 'GET_CHAIN_OF_COMMAND';
const SET_CHAIN_OF_COMMAND = 'SET_CHAIN_OF_COMMAND';
const SET_PERSONALIZED_DATA = 'SET_PERSONALIZED_DATA';
const SET_LOADER = 'SET_LOADER';
const SET_CHECK_PARAM = 'SET_CHECK_PARAM';
const GET_LEVEL_REPORTEE = 'GET_LEVEL_REPORTEE';
const SET_LEVEL_REPORTEE = 'SET_LEVEL_REPORTEE';
const GET_UP_LEVEL_REPORTEE = 'GET_UP_LEVEL_REPORTEE';
const UPDATE_DIRECT_LEVEL_REPORTEE = 'UPDATE_DIRECT_LEVEL_REPORTEE';
const UPDATE_GO_UPLEVEL_REPORTEE = 'UPDATE_GO_UPLEVEL_REPORTEE';
const SET_SCREEN = 'SET_SCREEN';
const SET_LEVEL_CHANGE = 'SET_LEVEL_CHANGE';
const SET_SEARCH_FORM = 'SET_SEARCH_FORM';
const SET_RESULTS = 'SET_RESULTS';
const SET_RESULTS_OPTIONS = 'SET_RESULTS_OPTIONS';
const SET_DELIMITER_OPTIONS = ' SET_DELIMITER_OPTIONS';
const SET_PROFILE = 'SET_PROFILE';
const SET_CHAIN_COMMAND = 'SET_CHAIN_COMMAND';
const SET_DIRECT_REPORT = 'SET_DIRECT_REPORT';
const SET_LEVEL = 'SET_LEVEL';
const UPDATE_RESULT_PERSONALIZATION = 'UPDATE_RESULT_PERSONALIZATION';
const CLEAR_SEARCH_FORM = 'CLEAR_SEARCH_FORM';
const UPLOAD_CLICKED = 'UPLOAD_CLICKED'
const CLEAR_CHECK_FORM = 'CLEAR_CHECK_FORM';
const SET_PREVIOUS_SCREEN = 'SET_PREVIOUS_SCREEN';
const UPDATE_ALL_CHECK = 'UPDATE_ALL_CHECK';
const SET_UP_LEVEL_REPORTEE = 'SET_UP_LEVEL_REPORTEE';
const SET_INDIVIDUAL_MANAGER_DETAILS = 'SET_INDIVIDUAL_MANAGER_DETAILS';
const GET_INDIVIDUAL_MANAGER_DETAILS = 'GET_INDIVIDUAL_MANAGER_DETAILS';
const SET_ALLCHECK = 'SET_ALLCHECK';
const UPDATE_CHAIN_OF_COMMAND = 'UPDATE_CHAIN_OF_COMMAND';
const UPDATE_ALL_EMPLOYEE_REPORTEE = 'UPDATE_ALL_EMPLOYEE_REPORTEE;';
const SET_EMPLOYEE_ONLY_FLAG = 'SET_EMPLOYEE_ONLY_FLAG';
const SET_REPORTEES_LEVEL = 'SET_REPORTEES_LEVEL';
const GET_LOGGED_IN_USERS = 'GET_LOGGED_IN_USERS';
const SET_LOGGED_IN_USERS = 'SET_LOGGED_IN_USERS';
const GET_USER_PHOTOS = 'GET_USER_PHOTOS';
const SET_USER_PHOTOS = 'SET_USER_PHOTOS';
const GET_LOGOUT_USER = 'GET_LOGOUT_USER';
const SET_LOGOUT_USER = 'SET_LOGOUT_USER';
const UPDATE_PHOTOS = 'UPDATE_PHOTOS';
const POST_SUCCESS = 'POST_SUCCESS';
const SET_DATA_NOT_FOUND = 'SET_DATA_NOT_FOUND';

export const actions = {
    getSearchResults: open => ({ type: GET_SEARCH_RESULTS, payload: open }),
    setSearchResults: open => ({ type: SET_SEARCH_RESULTS, payload: open }),
    getIndividualDetail: open => ({ type: GET_INDIVIDUAL_DETAILS, payload: open }),
    setIndividualDetails: open => ({ type: SET_INDIVIDUAL_DETAILS, payload: open }),
    getDirectReporteeCount: open => ({ type: GET_DIRECT_REPORTEE_COUNT, payload: open }),
    setDirectReporteeCount: open => ({ type: SET_DIRECT_REPORTEE_COUNT, payload: open }),
    getDirectReportee: open => ({ type: GET_DIRECT_REPORTEE, payload: open }),
    setDirectReportee: open => ({ type: SET_DIRECT_REPORTEE, payload: open }),
    setLoader: open => ({ type: SET_LOADER, payload: open }),
    setAllCheck: open => ({ type: SET_ALLCHECK, payload: open }),
    getChainOfCommand: open => ({ type: GET_CHAIN_OF_COMMAND, payload: open }),
    setChainOfcommand: open => ({ type: SET_CHAIN_OF_COMMAND, payload: open }),
    setPersonalizedData: open => ({ type: SET_PERSONALIZED_DATA, payload: open }),
    setCheckParam: open => ({ type: SET_CHECK_PARAM, payload: open }),
    getLevelReportee: open => ({ type: GET_LEVEL_REPORTEE, payload: open }),
    getUpLevelReportee: open => ({ type: GET_UP_LEVEL_REPORTEE, payload: open }),
    setUpLevelReportee: open => ({ type: SET_UP_LEVEL_REPORTEE, payload: open }),
    setLevelReportee: open => ({ type: SET_LEVEL_REPORTEE, payload: open }),
    setScreen: open => ({ type: SET_SCREEN, payload: open }),
    setLevelChange: open => ({ type: SET_LEVEL_CHANGE, payload: open }),
    setSearchForm: open => ({ type: SET_SEARCH_FORM, payload: open }),
    setResults: open => ({ type: SET_RESULTS, payload: open }),
    setResultsOptions: open => ({ type: SET_RESULTS_OPTIONS, payload: open }),
    setDelimiterOption: open => ({ type: SET_DELIMITER_OPTIONS, payload: open }),
    setProfile: open => ({ type: SET_PROFILE, payload: open }),
    setLevel: open => ({ type: SET_LEVEL, payload: open }),
    updateDirectLevelReportee: open => ({ type: UPDATE_DIRECT_LEVEL_REPORTEE, payload: open }),
    updateUpLevelReportee: open => ({ type: UPDATE_GO_UPLEVEL_REPORTEE, payload: open }),
    updateResultPersonalization: open => ({ type: UPDATE_RESULT_PERSONALIZATION, payload: open }),
    updateAllCheck: open => ({ type: UPDATE_ALL_CHECK, payload: open }),
    clearSearchForm: () => ({ type: CLEAR_SEARCH_FORM }),
    clearCheckForm: () => ({ type: CLEAR_CHECK_FORM }),
    setPreviousScreen: open => ({ type: SET_PREVIOUS_SCREEN, payload: open }),
    getManagerDetails: open => ({ type: GET_INDIVIDUAL_MANAGER_DETAILS, payload: open }),
    setManagerDetails: open => ({ type: SET_INDIVIDUAL_MANAGER_DETAILS, payload: open }),
    updateChainOfCommand: open => ({ type: UPDATE_CHAIN_OF_COMMAND, payload: open }),
    updateAllEmployeeReportee: open => ({ type: UPDATE_ALL_EMPLOYEE_REPORTEE, payload: open }),
    setEmployeeOnlyFlag: open => ({ type: SET_EMPLOYEE_ONLY_FLAG, payload: open }),
    setReporteesLevel: open => ({ type: SET_REPORTEES_LEVEL, payload: open }),
    getLoggedInUser: open => ({ type: GET_LOGGED_IN_USERS, payload: open }),
    setLoggedInUser: open => ({ type: SET_LOGGED_IN_USERS, payload: open }),
    getUserPhoto: open => ({ type: GET_USER_PHOTOS, payload: open }),
    setUserPhoto: open => ({ type: SET_USER_PHOTOS, payload: open }),
    getLogoutUser: open => ({ type: GET_LOGOUT_USER, payload: open }),
    setLogoutUser: open => ({ type: SET_LOGOUT_USER, payload: open }),
    updateImage: open => ({ type: UPDATE_PHOTOS, payload: open }),
    postSuccess: open => ({ type: POST_SUCCESS, payload: open }),
    uploadClicked: open => ({type: UPLOAD_CLICKED, payload: open}),
    setDataNotFound: open => ({type: SET_DATA_NOT_FOUND, payload: open})
};

function searchChildNode(tree, targetId, data, toggleFlag, employeeOnlyFlag) {
    if (tree.professionalInfo && (tree.professionalInfo[0].gpid) === targetId) {
        tree.isExpanded = toggleFlag;
        return tree;
    }
    if (tree.children) {
        for (const children of tree.children) {
            const childNode = searchChildNode(children, targetId, data, toggleFlag, employeeOnlyFlag);
            if (childNode) {
                toggleFlag
                    ? (childNode.children = data.filter(item => {
                          if (employeeOnlyFlag) {
                              return item.professionalInfo[0].employeeType !== 'External';
                          }
                          return true;
                      }))
                    : (childNode.children = null);

                return childNode;
            }
        }
    }
}

export default (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_SEARCH_RESULTS:
            return { ...state, searchResults: payload };
        case SET_LOGGED_IN_USERS:
            return { ...state, loggedInUser: payload };
        case SET_USER_PHOTOS:
            return { ...state, userPhoto: payload };
        case SET_EMPLOYEE_ONLY_FLAG:
            return { ...state, employeeOnlyFlag: payload };
        case SET_INDIVIDUAL_DETAILS:
            return { ...state, searchResults: payload };
        case SET_INDIVIDUAL_MANAGER_DETAILS:
            return { ...state, managerDetails: payload };
        case SET_REPORTEES_LEVEL:
            return { ...state, reporteesLevel: payload };
        case SET_LOGOUT_USER:
            return { ...state, logoutUser: payload };
        case UPLOAD_CLICKED:
            return{...state, uploadClicked: payload};
        case SET_DATA_NOT_FOUND:
            return { ...state, dataNotFound: payload};

        case SET_DIRECT_REPORTEE_COUNT:
            return { ...state, directReporteeCount: payload };
        case SET_DIRECT_REPORTEE:
            const GET_PAYLOAD = payload.payload;
            const tempAllChainOfCommandResult = [...state.allChainOfCommand.result];

            if (!GET_PAYLOAD.isChild && parseInt(GET_PAYLOAD && GET_PAYLOAD.level) === 0) {
                tempAllChainOfCommandResult.forEach(item => {
                    if (item.gpid === GET_PAYLOAD.gpid) {
                        if (GET_PAYLOAD.toggleFlag) {
                            item.children = payload.data.filter(item => {
                                if (state.employeeOnlyFlag) {
                                    return item.professionalInfo[0].employeeType !== 'External';
                                }
                                return true;
                            });
                            item.isExpanded = true;
                        } else {
                            item.children = null;
                            item.isExpanded = false;
                        }
                    }
                });
            } else {
                searchChildNode(
                    tempAllChainOfCommandResult.filter(item => item.gpid === GET_PAYLOAD.parentNode.gpid)[0],
                    GET_PAYLOAD.gpid,
                    payload.data,
                    GET_PAYLOAD.toggleFlag,
                    state.employeeOnlyFlag
                );
            }
            const tempAllChainOfCommand = { ...state.allChainOfCommand, result: tempAllChainOfCommandResult };
            tempAllChainOfCommand.result.forEach(child => {
                if (child.children && child.children.length) {
                    for (let i = 0; i < state.allChainOfCommand.result.length; i++) {
                        child.children = child.children.filter(result => result.professionalInfo[0].gpid !== state.allChainOfCommand.result[i].gpid);
                    }
                }
            });

            return { ...state, allChainOfCommand: tempAllChainOfCommand };

        case SET_CHAIN_OF_COMMAND:
            return { ...state, allChainOfCommand: payload, allChainOfCommandOriginalList: JSON.parse(JSON.stringify(payload)) };
        case UPDATE_CHAIN_OF_COMMAND:
            let tempAllChainOfCommandOriginalList = JSON.parse(JSON.stringify(state.allChainOfCommandOriginalList.result));
            let tempAllEmployeeChainOfCommand = [...state.allChainOfCommand.result];
            let tempCurrentChainResult = [];
            if (payload) {
                tempCurrentChainResult = tempAllEmployeeChainOfCommand.filter(result => result.empType === 'M');
                function getALlChildEMployees(data) {
                    data.forEach(item => {
                        if (item.children && item.children.length) {
                            item.children = item.children.filter(a => a.professionalInfo[0].employeeType !== 'External');
                            let tempChild = item.children.filter(b => b.children);
                            getALlChildEMployees(tempChild);
                        }
                    });
                    return data;
                }
                getALlChildEMployees(tempCurrentChainResult)
            } else {
                tempCurrentChainResult = tempAllChainOfCommandOriginalList;
            }
            return { ...state, allChainOfCommand: { ...state.allChainOfCommand, result: tempCurrentChainResult } };

        case SET_PERSONALIZED_DATA:
            return { ...state, allPersonalizedColumn: payload, originalAllPersonalizedColumn: JSON.parse(JSON.stringify(state.personalizedColumnList)) };
        case SET_LEVEL_REPORTEE:
            // const CURRENT_EMPLOYEE_LEVEL = payload.data.result.length > 0 && payload.data.result.filter(item => item.gpid == payload.gpid)[0].level;
            // const sortedWithLevel = payload.data.result && payload.data.result.length > 0 && payload.data.result.sort((a, b) => b.level - a.level);
            // const MAX_LEVEL = sortedWithLevel && sortedWithLevel.length > 0 && sortedWithLevel[0].level;
            let tempAllLevelReportee1 = JSON.parse(JSON.stringify([...payload.data.result]));
            // tempAllLevelReportee1 = tempAllLevelReportee1.filter(item => item.level == CURRENT_EMPLOYEE_LEVEL);
            return {
                ...state,
                allLevelReportee: { ...state.allLevelReportee, result: tempAllLevelReportee1 },
                // currentLevel: parseInt(CURRENT_EMPLOYEE_LEVEL), maxLevel: MAX_LEVEL,
                allLevelReporteeOriginalList: payload.data,
                currentOriginalList: JSON.parse(JSON.stringify(tempAllLevelReportee1))
            };
        // return { ...state, allLevelReportee: payload.data.result }
        case SET_UP_LEVEL_REPORTEE:
            const CURRENT_EMPLOYEE_UP_LEVEL = payload.gpid.currentLevel;
            const sortedWithUpLevel = payload.data.result && payload.data.result.length > 0 && payload.data.result.sort((a, b) => b.level - a.level);
            const MAX_UP_LEVEL = sortedWithUpLevel && sortedWithUpLevel.length > 0 && sortedWithUpLevel[0].level;
            let tempAllUpLevelReportee1 = JSON.parse(JSON.stringify(sortedWithUpLevel));
            tempAllUpLevelReportee1 = tempAllUpLevelReportee1.filter(item => item.level > CURRENT_EMPLOYEE_UP_LEVEL);
            const tempItem = tempAllUpLevelReportee1[tempAllUpLevelReportee1.length - 1];
            tempAllUpLevelReportee1 = [tempItem];

            return {
                ...state,
                allLevelReportee: { ...state.allLevelReportee, result: tempAllUpLevelReportee1 },
                currentLevel: parseInt(CURRENT_EMPLOYEE_UP_LEVEL),
                maxUpLevel: MAX_UP_LEVEL,
                allUpLevelReporteeOriginalList: payload.data,
                currentUpLevel: tempAllUpLevelReportee1[0].level
            };
        case SET_SCREEN:
            window.scrollTo(0, 0);
            return { ...state, screen: payload };
        case SET_PREVIOUS_SCREEN:
            return { ...state, previousScreen: payload };
        case SET_CHECK_PARAM:
            return { ...state, checkParam: payload };
        case SET_SEARCH_FORM:
            return { ...state, formValues: payload };
        case SET_RESULTS:
            return { ...state, results: payload };
        case SET_RESULTS_OPTIONS:
            return { ...state, resultsOptions: payload };
        case SET_LOADER:
            return { ...state, loader: payload };
        case SET_DELIMITER_OPTIONS:
            return { ...state, delimiterOption: payload };
        case SET_PROFILE:
            return { ...state, profile: payload };
        case SET_CHAIN_COMMAND:
            return { ...state, chainOfcommand: payload };
        case SET_DIRECT_REPORT:
            return { ...state, directRaport: payload };
        case SET_LEVEL:
            return { ...state, level: payload };
        case SET_LEVEL_CHANGE:
            return { ...state, levelChanged: payload };
        case UPDATE_DIRECT_LEVEL_REPORTEE:
            let tempAllLevelReportee = JSON.parse(JSON.stringify([...state.allLevelReporteeOriginalList.result]));
            let tempCurrentLevelResult = tempAllLevelReportee.filter(item => item.level === payload);
            return { ...state, allLevelReportee: { ...state.allLevelReportee, result: tempCurrentLevelResult }, currentLevel: payload };
        case UPDATE_GO_UPLEVEL_REPORTEE:
            let tempUpAllLevelReportee = JSON.parse(JSON.stringify([...state.allUpLevelReporteeOriginalList.result]));
            tempUpAllLevelReportee = tempUpAllLevelReportee.filter(item => item.level >= payload);
            return { ...state, allLevelReportee: { ...state.allLevelReportee, result: tempUpAllLevelReportee }, currentLevel: payload };
        case UPDATE_ALL_EMPLOYEE_REPORTEE:
            let tempAllEmployeeLevelReportee = [...state.allLevelReportee.result];
            let tempAllEmployeeLengthCheck = state.allEmployeeLengthCheck;
            let tempCurrentReporteeResult = [];
            if (payload) {
                tempAllEmployeeLevelReportee = tempAllEmployeeLevelReportee.filter(result => result.empType === 'M');
                tempAllEmployeeLevelReportee.forEach(item => {
                    if (item.directReportees && item.directReportees.length) {
                        item.directReportees = item.directReportees.filter(reportee => reportee.empType !== 'External');
                    }
                });
                tempCurrentReporteeResult = tempAllEmployeeLevelReportee;
                if (tempCurrentReporteeResult.length === 0) {
                    tempAllEmployeeLengthCheck = true;
                }
            } else {
                tempCurrentReporteeResult = JSON.parse(JSON.stringify(state.currentOriginalList));
            }
            return {
                ...state,
                allLevelReportee: { ...state.allLevelReportee, result: tempCurrentReporteeResult },
                allEmployeeLengthCheck: tempAllEmployeeLengthCheck
            };
        case SET_ALLCHECK:
            return { ...state, allChecked: payload };
        case UPDATE_RESULT_PERSONALIZATION:
            if (!payload) {
                return {
                    ...state,
                    personalizedColumnList: [
                        {
                            key: 'type',
                            text: 'Type',
                            value: true,
                            sortingOrder: 1
                        },
                        {
                            key: 'firstName',
                            text: 'First Name',
                            value: true,
                            sortingOrder: 2
                        },
                        {
                            key: 'lastName',
                            text: 'Last Name',
                            value: false,
                            sortingOrder: 4
                        },
                        {
                            key: 'middleName',
                            text: 'Middle Name',
                            value: false,
                            sortingOrder: 3
                        },
                        {
                            key: 'secondFirstName',
                            text: 'Secondary First Name',
                            value: false,
                            sortingOrder: 19
                        },
                        {
                            key: 'secondLastName',
                            text: 'Secondary Last Name',
                            value: false,
                            sortingOrder: 20
                        },
                        {
                            key: 'prefFirstName',
                            text: 'Preferred First Name',
                            value: false,
                            sortingOrder: 21
                        },
                        {
                            key: 'prefLastName',
                            text: 'Preferred Last Name',
                            value: false,
                            sortingOrder: 22
                        },
                        {
                            key: 'jobTitle',
                            text: 'Job Title',
                            value: true,
                            sortingOrder: 5
                        },
                        {
                            key: 'GPID',
                            text: 'GPID',
                            value: true,
                            sortingOrder: 6
                        },
                        {
                            key: 'workPhone',
                            text: 'Work Phone',
                            value: true,
                            sortingOrder: 8
                        },
                        {
                            key: 'Email',
                            text: 'Email',
                            value: true,
                            sortingOrder: 7
                        },
                        {
                            key: 'sector',
                            text: 'Sector',
                            value: true,
                            sortingOrder: 9
                        },
                        // {
                        //     key: 'country',
                        //     text: 'Country',
                        //     value: false,
                        //     sortingOrder: 12
                        // },
                        {
                            key: 'userFunction',
                            text: 'User Function',
                            value: true,
                            sortingOrder: 13
                        },
                        {
                            key: 'managerID',
                            text: 'Manager ID',
                            value: false
                        },
                        {
                            key: 'businessUnit',
                            text: 'Business Unit',
                            value: false,
                            sortingOrder: 14
                        },
                        {
                            key: 'marketingUnit',
                            text: 'Marketing Unit',
                            value: false,
                            sortingOrder: 15
                        },
                        {
                            key: 'division',
                            text: 'Division',
                            value: false,
                            sortingOrder: 16
                        },

                        {
                            key: 'region',
                            text: 'Region',
                            value: false,
                            sortingOrder: 17
                        },
                        {
                            key: 'territory',
                            text: 'Territory',
                            value: false,
                            sortingOrder: 18
                        },

                        {
                            key: 'subFunction',
                            text: 'Sub Function',
                            value: false,
                            sortingOrder: 23
                        },

                        {
                            key: 'deskPhone',
                            text: 'Desk Phone',
                            value: false,
                            sortingOrder: 24
                        },
                        {
                            key: 'fax',
                            text: 'FAX',
                            value: false,
                            sortingOrder: 25
                        },
                        {
                            key: 'workAddress',
                            text: 'Work Address',
                            value: true,
                            sortingOrder: 10
                        },
                        {
                            key: 'city',
                            text: 'City',
                            value: false,
                            sortingOrder: 11
                        },

                        {
                            key: 'timeZone',
                            text: 'Time Zone',
                            value: false,
                            sortingOrder: 26
                        }
                    ]
                };
            } else {
                return { ...state, personalizedColumnList: payload, originalAllPersonalizedColumn: JSON.parse(JSON.stringify(state.personalizedColumnList)) };
            }
        case CLEAR_SEARCH_FORM:
            return {
                ...state,
                formValues: {
                    firstName: '',
                    secondFirstName: '',
                    lastName: '',
                    secondLastName: '',
                    middleName: '',
                    prefFirstName: '',
                    GPID: '',
                    emailAddress: '',
                    prefLastName: '',
                    workPhone: '',
                    deskPhone: '',
                    sector: '',
                    jobTitle: '',
                    region: '',
                    territory: '',
                    userFunction: '',
                    subFunction: '',
                    workAddress: '',
                    fax: '',
                    city: '',
                    managerID: '',
                    country: '',
                    businessUnit: '',
                    marketingUnit: '',
                    division: '',
                    timeZone: ''
                }
            };
        case CLEAR_CHECK_FORM:
            return {
                ...state,
                personalizedColumn: {
                    firstName: true,
                    lastName: false,
                    middleName: false,
                    secondFirstName: false,
                    secondLastName: false,
                    prefFirstName: false,
                    prefLastName: false,
                    GPID: true,
                    managerID: true,
                    businessUnit: false,
                    marketingUnit: false,
                    division: false,
                    sector: true,
                    jobTitle: true,
                    region: false,
                    territory: false,
                    userFunction: true,
                    subFunction: false,
                    workPhone: true,
                    deskPhone: false,
                    fax: false,
                    workAddress: true,
                    city: false,
                    timeZone: false
                }
            };
        case POST_SUCCESS:
            return { ...state, photoUpload: payload };
        default:
            return state;
    }
};
