import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actions } from '../state/reducer';
import { getSafe } from '../data/utils';
import { Link } from 'gatsby';

const ChildNode = props => {
    const { node, level = 0, onToggle, childLevelState, setChildLevelState } = props;
    setChildLevelState(node.professionalInfo[0].level);

    return (
        <li>
            <div className={`level-${parseInt(childLevelState)}`}>
                <i
                    className={`${node.isExpanded ? 'far fa-minus-square' : 'far fa-plus-square'}`}
                    onClick={() => onToggle(node, true, level, !node.isExpanded)}></i>
                <Link to={`/profile?gpid=` + node.professionalInfo[0].gpid} title={`${getSafe(() => node.firstName)} ${getSafe(() => (node.lastName ? node.lastName : ''))}`}>
                    {`${getSafe(() => node.firstName)} ${getSafe(() => (node.lastName ? node.lastName : ''))}`}
                </Link>
            </div>
            <div>{node.professionalInfo[0].employeeType === "External" || node.professionalInfo[0].employeeType === "C" ? "C" : "E"}</div>

            <div title={node.professionalInfo[0].title}>{node.professionalInfo[0].title}</div>
            <div>
                <Link to={`/profile?gpid=` + node.gpid}>{node.professionalInfo[0].gpid}</Link>
            </div>
            <div>{node.telephone && node.telephone}</div>
            <div>
                <a href={`mailto:${node.emailAddresses[0].emailAddress}`} title={node.emailAddresses[0].emailAddress}>
                    {node.emailAddresses[0].emailAddress}
                </a>
            </div>
            <div title={node.professionalInfo[0].sector}>{node.professionalInfo[0].sector}</div>
            <div>{node.professionalInfo[0].function}</div>
            <div>{node.professionalInfo[0].locationCountryName}</div>
        </li>
    );
};

const ParentNode = props => {
    const { node, onToggle, level = 0, levelState, setLevelState } = props;
    setLevelState(node.level);

    return (
        <li key={node.profileId} level={level}>
            <div className={`level-${levelState}`}>
                <i className={`${node.isExpanded ? 'far fa-minus-square' : 'far fa-plus-square'}`}
                    onClick={() => onToggle(node, false, level, !node.isExpanded, levelState)}></i>
                <Link to={`/profile?gpid=` + node.gpid} title={`${getSafe(() => node.firstName)} ${getSafe(() => (node.lastName ? node.lastName : ''))}`}>
                    {`${getSafe(() => node.firstName)} ${getSafe(() => (node.lastName ? node.lastName : ''))}`}
                </Link>
            </div>
            <div>{node.empType === "External" || node.empType === "C" ? "C" : "E"}</div>

            <div title={node.hrTitle}>{node.hrTitle}</div>
            <div>
                <Link to={`/profile?gpid=` + node.gpid}>{node.gpid}</Link>
            </div>
            <div>{node.telephone && node.telephone}</div>
            <div>
                <a href={`mailto:${node.email}`} title={node.email}>
                    {node.email}
                </a>
            </div>
            <div title={node.sector}>{node.sector && node.sector}</div>
            <div>{node.function && node.function}</div>
            <div>{node.country && node.country}</div>
        </li>
    );
};

const TreeNode = props => {
    const dispatch = useDispatch();

    const { node, isChild, level = 0, maxLevel } = props;
    const [levelState, setLevelState] = useState(0);
    const [childLevelState, setChildLevelState] = useState(0);

    const handleData = result => {
        const gpid = result.gpid;
        dispatch(actions.getIndividualDetail(gpid));
        dispatch(actions.setScreen(4));
    };
    const handleChildData = result => {
        const gpid = result.professionalInfo[0].gpid;
        dispatch(actions.getIndividualDetail(gpid));
        dispatch(actions.setScreen(4));
    };

    return (
        <>
            {isChild ? (
                <ChildNode {...props} handleChildData={handleChildData} childLevelState={childLevelState} setChildLevelState={setChildLevelState} />
            ) : (
                <ParentNode {...props} handleData={handleData} levelState={levelState} setLevelState={setLevelState} />
            )}

            {node.children
                ? node.children.map(childNode => (
                      <TreeNode isChild={true} {...props} node={childNode} level={parseInt(level) + 1} levelState={levelState} maxLevel={maxLevel} />
                  ))
                : null}
        </>
    );
};

export default TreeNode;
