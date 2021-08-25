import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { actions } from '../state/reducer'
import { useSelector } from "react-redux"
import { getSafe } from "../data/utils"
import ExportReactCSV from './ExportReactCSV';
import NotFoundError from './NotFoundError';
import { Link } from 'gatsby';





/**
 * SearchResults Component
 * @constant
 * @type {function}
 * @returns {JSX}
 */

const SearchResults = () => {


	const dispatch = useDispatch();
	const SearchResultFileName = "Search Results.csv";
	const PersonalizeSearchResultFileName = "Personalized Search Results.csv"
	// const formValues = data.formValues;
	const data = useSelector(state => state.people);
	let searchResults = []
	searchResults = data.searchResults;
	const selectedOption = data.allPersonalizedColumn;
	let allSelectedKey = selectedOption.map(option => option.name);
	const searchResultData = !!searchResults && (searchResults.length >= 1) && searchResults.map(result => ({
		...allSelectedKey.includes("Type") && { 'Type': result.professionalInfo[0].employeeType === "External" || result.professionalInfo[0].employeeType === "C" ? "C" : "E"},
		...allSelectedKey.includes("First Name") && { 'Name': `${result.firstName} ${result.lastName} `},
		...allSelectedKey.includes("Job Title") && { 'Job Title': result.professionalInfo[0].title },
		...allSelectedKey.includes("GPID") && { 'GPID': result.professionalInfo[0].gpid },
		...allSelectedKey.includes("Work Phone") && { 'Work Phone': result.phoneNumbers[0].phoneNumber },
		...allSelectedKey.includes("Email") && { 'Email': result.emailAddresses[0].emailAddress },
		...allSelectedKey.includes("Sector") && { 'Sector': result.professionalInfo[0].sector },
		...allSelectedKey.includes("User Function") && { 'Function': result.professionalInfo[0].function },
		...allSelectedKey.includes("Last Name") && { 'Last Name': result.lastName },
		...allSelectedKey.includes("Middle Name") && { 'Middle Name': result.middleName },
		...allSelectedKey.includes("Manager ID") && { 'Manager ID': result.professionalInfo[0].managerId },
		...allSelectedKey.includes("Business Unit") && { 'Business Unit': result.professionalInfo[0].buName },
		...allSelectedKey.includes("Marketing Unit") && { 'Marketing Unit': result.professionalInfo[0].muName },
		...allSelectedKey.includes("Division") && { 'Division': result.professionalInfo[0].divisionId },
		...allSelectedKey.includes("Region") && { 'Region': result.professionalInfo[0].region },
		...allSelectedKey.includes("Work Address") && { 'Work Address': result.professionalInfo[0].locationAddrss1 },
		...allSelectedKey.includes("Work Phone") && { 'Work Phone': result.phoneNumbers[0].phoneNumber },
		...allSelectedKey.includes("Desk Phone") && { 'Desk Phone': result.phoneNumbers[1].phoneNumber },
		...allSelectedKey.includes("Time Zone") && { 'Time Zone': result.professionalInfo[0].locationTimezone },
		...allSelectedKey.includes("City") && { 'City': result.professionalInfo[0].locationCityName },

	}));
	function compare( a, b ) {
		if ( a.firstName < b.firstName ){
		  return -1;
		}
		if ( a.firstName > b.firstName ){
		  return 1;
		}
		return 0;
	  }
	  
searchResults.sort( compare );

	useEffect(() => {
		const dataForm = window.location.search.slice(1).split('&').reduce((a, e) => {
			const tempElm = e.split('=');
			a[tempElm[0]] = tempElm[1]
			return a
		}, {})
		if(dataForm){
		dispatch(actions.getSearchResults(dataForm))
		}
	}, [])

	const defaultSelectedOption = [...selectedOption]
	if (parseInt(defaultSelectedOption.length) === 0) {
		for (var i = 0; i < data.personalizedColumnList.length; i++) {
			if (data.personalizedColumnList[i].value === true) {
				defaultSelectedOption.push({ name: data.personalizedColumnList[i].text, ...data.personalizedColumnList[i] });

			}
		}
		if (parseInt(defaultSelectedOption.length) > 0) {
			defaultSelectedOption.sort((a, b) => a.sortingOrder - b.sortingOrder)
			dispatch(actions.setPersonalizedData(defaultSelectedOption))

		}

	}

	const handleSearchPrepareResults = () => {
		// dispatch(actions.setScreen(3));
		dispatch(actions.setPreviousScreen(2))
	}
	const handleNewSearch = () => {
		// dispatch(actions.clearSearchForm())
		dispatch(actions.setPersonalizedData([]))
		dispatch(actions.updateResultPersonalization())
		dispatch(actions.setAllCheck(false));

		// dispatch(actions.setScreen(1))
		// window.location = '/'

	}

	return (
		<div>
			{data.loader === 0 && <div className="suspense inside"><i className="fas fa-spinner fa-pulse"></i></div>}

			{data.loader === 1 && searchResults.length > 0 ?
				<div className="search-results">
					<div className="result-count">
						<div className="float-left">{selectedOption && selectedOption.length > 0 ? `Found ${searchResults.length} Results` : `Found 0 Results`}</div>
						<div className="results-buttons-top">
							<Link to="/personalization" onClick={handleSearchPrepareResults}>
								<button className="bottom-prepare-result" ><i className="fas fa-cog icon-buttom" title="Prepare Results"></i>Personalize Result</button></Link>

							<Link to="/" onClick={handleNewSearch}>
								<button className="button-new-search"><i className="fas fa-search icon-buttom" title="New Search"></i>Back to Search</button>
							</Link>
							{searchResults && searchResults.length === 1 ?
								<ExportReactCSV csvData={searchResultData} fileName={PersonalizeSearchResultFileName} buttonText="Export to Excel" /> :
								<ExportReactCSV csvData={searchResultData} fileName={SearchResultFileName} buttonText="Export to Excel" />}
						</div>
						<div ></div>
					</div>

					<div className="tableContainer">
						<table>
							<thead>
								<tr>

									{selectedOption && selectedOption.map(option => {
										return (
											<th>{option.name === "First Name" ? "Name" : option.name}</th>
										)
									})}



								</tr>
							</thead>
							<tbody>
								{searchResults && searchResults.length > 0 && searchResults.map(result => {
									return (
										<tr key={result.professionalInfo[0].gpid}>
											{selectedOption && selectedOption.map(option => {
												return (
													<td>
														{option.key === "type" && result.professionalInfo[0].employeeType && <td>{getSafe(() => result.professionalInfo[0].employeeType === 'External' ? "C" : "E")}</td>}
														{option.key === "firstName" && result.firstName &&
															<td className="trim-data trim-name" 
																title={`${getSafe(() => result.firstName)} ${getSafe(() => result.lastName)}`}>
																<Link to={`/profile?gpid=` + getSafe(() => result.professionalInfo[0].gpid)}>{`${getSafe(() => result.firstName)} ${getSafe(() => result.middleName ? result.middleName : '')} ${getSafe(() => result.lastName)}`}</Link></td>}
														{option.key === "lastName" && result.lastName && <td>{getSafe(() => result.lastName)}</td>}
														{option.key === "Email" && result.emailAddresses[0].emailAddress && <td className="trim-data" title={result.emailAddresses[0].emailAddress}><a href={`mailto:${result.emailAddresses[0].emailAddress}`}>{getSafe(() => result.emailAddresses[0].emailAddress)}</a></td>}
														{option.key === "middleName" && result.middleName && <td>{getSafe(() => result.middleName)}</td>}
														{option.key === "secondFirstName" && result.secondFirstName && <td>{getSafe(() => result.secondFirstName)}</td>}
														{option.key === "secondLastName" && result.secondLastName && <td>{getSafe(() => result.secondLastName)}</td>}
														{option.key === "prefFirstName" && result.prefFirstName && <td>{getSafe(() => result.prefFirstName)}</td>}
														{option.key === "prefLastName" && result.prefLastName && <td>{getSafe(() => result.prefLastName)}</td>}
														{option.key === "GPID" && result.professionalInfo[0].gpid && <td><Link to={`/profile?gpid=` + getSafe(() => result.professionalInfo[0].gpid)}>{getSafe(() => result.professionalInfo[0].gpid)}</Link></td>}
														{option.key === "managerID" && result.professionalInfo[0].managerID && <td>{getSafe(() => result.professionalInfo[0].managerID)}</td>}
														{option.key === "businessUnit" && result.professionalInfo[0].buName && <td>{getSafe(() => result.professionalInfo[0].buName)}</td>}
														{option.key === "marketingUnit" && result.professionalInfo[0].muName && <td>{getSafe(() => result.professionalInfo[0].muName)}</td>}
														{option.key === "division" && result.professionalInfo[0].divisionId && <td>{getSafe(() => result.professionalInfo[0].divisionId)}</td>}
														{option.key === "sector" && result.professionalInfo[0].sector && <td className="trim-data" title={result.professionalInfo[0].sector}>{getSafe(() => result.professionalInfo[0].sector)}</td>}
														{option.key === "jobTitle" && result.professionalInfo[0].title && <td className="trim-data" title={result.professionalInfo[0].title}>{getSafe(() => result.professionalInfo[0].title)}</td>}
														{option.key === "region" && result.professionalInfo[0].region && <td className="trim-data" title={result.professionalInfo[0].region}>{getSafe(() => result.professionalInfo[0].region)}</td>}
														{option.key === "territory" && result.professionalInfo[0].territory && <td>{getSafe(() => result.professionalInfo[0].territory)}</td>}
														{option.key === "userFunction" && result.professionalInfo[0].function && <td>{getSafe(() => result.professionalInfo[0].function)}</td>}
														{option.key === "subFunction" && result.professionalInfo[0].subFunction && <td>{getSafe(() => result.professionalInfo[0].subFunction)}</td>}
														{option.key === "workPhone" && result.phoneNumbers[0].phoneNumber && <td><i className="fa fa-phone phone-icon" aria-hidden="true"></i>{getSafe(() => result.phoneNumbers[0].phoneNumber)}</td>}
														{option.key === "deskPhone" && result.phoneNumbers[1].phoneNumber && <td>{getSafe(() => result.phoneNumbers[1].phoneNumber)}</td>}
														{option.key === "fax" && result.fax && <td>{getSafe(() => result.fax)}</td>}
														{option.key === "workAddress" && result.professionalInfo[0].locationAddrss1 && <td className="trim-data" title={`${getSafe(() => result.professionalInfo[0].locationAddrss1)}, ${result.professionalInfo[0].locationCountryName} `}>{`${getSafe(() => result.professionalInfo[0].locationAddrss1)}, ${result.professionalInfo[0].locationCountryName} `}</td>}
														{option.key === "city" && result.professionalInfo[0].locationCityName && <td>{getSafe(() => result.professionalInfo[0].locationCityName)}</td>}
														{option.key === "timeZone" && result.professionalInfo.locationTimezone && <td>{getSafe(() => result.professionalInfo.locationTimezone)}</td>}
													</td>
												)
											})}
										</tr>
									)
								})
								}
							</tbody>
						</table>
					</div>
					<div className="results-buttons-bottom">
					<Link to="/personalization" onClick={handleSearchPrepareResults}>
								<button className="bottom-prepare-result" ><i className="fas fa-cog icon-buttom" title="Prepare Results"></i>Personalize Result</button></Link>
						<Link to="/" onClick={handleNewSearch}>
							<button className="button-new-search"><i className="fas fa-search icon-buttom" title="New Search"></i>Back to Search</button>
						</Link>
						{searchResults && searchResults.length === 1 ?
							<ExportReactCSV csvData={searchResultData} fileName={PersonalizeSearchResultFileName} buttonText="Export to Excel" /> :
							<ExportReactCSV csvData={searchResultData} fileName={SearchResultFileName} buttonText="Export to Excel" />}
					</div>

				</div> : (
					(data.loader === 1) && searchResults.length === 0 && <NotFoundError />
				)
			}

		</div >

	)
}

export default SearchResults