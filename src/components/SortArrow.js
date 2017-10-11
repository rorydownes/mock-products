import React from 'react';

import ArrowUp from 'react-icons/lib/md/arrow-drop-up';
import ArrowDown from 'react-icons/lib/md/arrow-drop-down';

const SortArrow = ({fieldName, sortField, isDescending}) => {
    if (!sortField) {
        return <ArrowDown/>;
    }

    if (sortField === fieldName) {
        return (isDescending) ? <ArrowDown/> : <ArrowUp/>;
    }
    return null;
};

export default SortArrow;
