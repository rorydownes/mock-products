import React from 'react';
import styles from './App.scss';
import copy from '../utils/copy.json';
import { PAGE_SIZES } from '../utils/constants';

const getPageOptions = pageCount => {
    let options = [];
    for (let i = 0; i < pageCount; i++) {
        options.push(<option value={i} key={`page-${i}`}>{i}</option>);
    }
    return options;
};

const PaginationControls = ({ orderedProducts, pageSize }) => {
    const pageCount = orderedProducts.length/pageSize;
    return (
        <div className={styles.paginationRow}>
            <span className={styles.paginationLeft}>
                <span>{copy.labelItemsPerPage}</span>
                <select name="itemsPerPage" id="itemsPerPage">
                    {PAGE_SIZES.map(option => <option value={option} key={`pagesize-${option}`}>{option}</option>)}
                </select>
            </span>
            <span className={styles.paginationRight}>
                <button>Previous</button>
                <select name="goToPage" id="goToPage">
                    {getPageOptions(pageCount)}
                </select>
                <button>Next</button>
            </span>
        </div>
    );
};

export default PaginationControls;
