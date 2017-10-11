import React from 'react';
import { connect } from 'react-redux';
import styles from './App.scss';
import copy from '../utils/copy.json';
import { PAGE_SIZES } from '../utils/constants';

import actions from '../redux/actionCreators';

const getPageOptions = pageCount => {
    let options = [];
    for (let i = 0; i < pageCount; i++) {
        options.push(<option value={i} key={`page-${i}`}>{i}</option>);
    }
    return options;
};

const PaginationControls = ({ renderedProducts, pageSize, changePageSize, start, changePageNumber }) => {
    const pageCount = renderedProducts.length/pageSize;
    const hasPreviousPage = start >= pageSize;
    const hasNextPage = (renderedProducts.length - start)/pageSize > 1;

    return (
        <div className={styles.paginationRow}>
            <span className={styles.paginationLeft}>
                <span>{copy.labelItemsPerPage}</span>
                <select
                    name="itemsPerPage"
                    id="itemsPerPage"
                    value={pageSize}
                    onChange={e => changePageSize(e.target.value)}
                >
                    {PAGE_SIZES.map(option => <option value={option} key={`pagesize-${option}`}>{option}</option>)}
                </select>
            </span>
            <span className={styles.paginationRight}>
                <button
                    disabled={!hasPreviousPage}
                    onClick={() => changePageNumber((start/pageSize) - 1)}>Previous</button>
                <select
                    name="goToPage"
                    id="goToPage"
                    value={start/pageSize}
                    onChange={(e) => changePageNumber(e.target.value)}
                >
                    {getPageOptions(pageCount)}
                </select>
                <button
                    disabled={!hasNextPage}
                    onClick={() => changePageNumber((start/pageSize) + 1)}>Next</button>
            </span>
        </div>
    );
};

const mapDispatchToProps = ({
    changePageSize: actions.changePageSize,
    changePageNumber: actions.changePageNumber
});

const mapStateToProps = ({ renderedProducts, pageSize, start }) => ({
    renderedProducts,
    pageSize,
    start
});

export default connect(mapStateToProps, mapDispatchToProps)(PaginationControls);
