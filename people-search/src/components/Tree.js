import React from 'react';

import TreeNode from './TreeNode';

const Tree = ({ details, onIconClick, state, maxLevel }) => {
    const onToggle = (node, isChild, level, toggleFlag, levelState) => {
        onIconClick(node, isChild, level, details, toggleFlag, levelState);
    };

    return <TreeNode node={details} onToggle={onToggle} maxLevel={maxLevel} />;
};

export default Tree;
