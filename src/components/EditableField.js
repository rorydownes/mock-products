import React from 'react';
import classnames from 'classnames';
import styles from './ProductsContainer.scss';

const editableField = ({productID, fieldName, fieldValue, isNumeric, uniqueKey, onChange, validationError}) => {
    return (
        <span>
            <input
                type={isNumeric ? "number" : "text"}
                className={classnames(styles.editableRowInput, {[styles.inputError]: !!validationError })}
                name={`${uniqueKey}-${fieldName}`}
                value={fieldValue}
                onChange={e => onChange(productID, fieldName, isNumeric ? parseFloat(e.target.value) : e.target.value)}
            />
            <span className={classnames({[styles.labelError]: !!validationError })}>{validationError}</span>
        </span>
    );
};

export default editableField;
