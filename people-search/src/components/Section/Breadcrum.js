import React from 'react';
import { useSelector } from "react-redux"
import { dispatch } from 'rxjs/internal/observable/pairs';


const Breadcrum = () => {
    const data = useSelector(state => state.people);

    return (
        <div className="breadcrum-list">
            <ul class="breadcrumb">
                {data.screen === 2 ? <li>Search Results</li> : null}
                {data.screen === 3 ? <li>Personalize Result</li> : null}
                {data.screen === 4 ? <li>Profile</li> : null}
                {data.screen === 5 ? <li>Chain of Command</li> : null}
                {data.screen === 6 ? <li>Direct Reportees</li> : null}


            </ul>
        </div>

    )
}

export default Breadcrum;

