import React from 'react';
import styles from './Header.scss';
import copy from '../utils/copy.json';

const PageTitle = () => {
    return <span className={styles.title}>{copy.title}</span>;
};

const ActionButtons = () => {
    return (
        <span className={styles.actionButtons}>
          <button className={styles.secondaryBtn}>{copy.btnExport}</button>
          <button className={styles.secondaryBtn}>{copy.btnImport}</button>
          <button className={styles.primaryBtn}>{copy.btnAddProduct}</button>
      </span>
    );
};

const Header = props => {
    return (
        <div className={styles.header}>
            <PageTitle {...props} />
            <ActionButtons {...props} />
        </div>
    );
};

export default Header;
