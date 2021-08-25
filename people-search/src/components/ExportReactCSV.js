import React from 'react'
import { CSVLink } from 'react-csv'

const ExportReactCSV = ({ csvData, fileName, buttonText, disabled }) => {

    const classNameList = ["button-export"]
    if (buttonText) {
        classNameList.push("csv-export-button")
    }
    // else {
    //     classNameList.push('empty')
    // }
    return (
        <CSVLink data={csvData} filename={fileName}>
            <button className={classNameList.join(' ')} disabled={disabled}>
                
                    <i className="far fa-file-download icon-buttom" title="Export"></i>
                    {buttonText && buttonText}
            </button>
        </CSVLink>
    )
}

export default ExportReactCSV;