import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './ProductsContainer.scss';
import copy from '../utils/copy.json';

import ArrowUp from 'react-icons/lib/md/arrow-drop-up';
import ArrowDown from 'react-icons/lib/md/arrow-drop-down';

import actions from '../redux/actionCreators';

const editableField = (productID, fieldName, fieldValue, key, onChange) => {
    return (
        <input
            type="text"
            className={styles.editableRowInput}
            name={`${key}-${fieldName}`}
            value={fieldValue}
            onChange={e => onChange(productID, 'name', e.target.value)}
        />
    );
};

const getSortArrow = (fieldName, sortField, isDescending) => {
    if (!sortField) {
        return <ArrowDown/>;
    }

    if (sortField === fieldName) {
        return (isDescending) ? <ArrowDown/> : <ArrowUp/>;
    }
};

class ProductsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerRowChecked: false
        };

        this.onCheckHeaderRow = this.onCheckHeaderRow.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
    }

    onCheckHeaderRow() {
        this.setState(state => ({
            headerRowChecked: !state.headerRowChecked
        }));
    }

    onChangeField(productID, fieldName, fieldValue) {
        console.log(productID, fieldName, fieldValue);
    }

    onSortBy(fieldName) {
        this.props.sortBy(fieldName);
    }

    render() {
        const {
            products,
            renderedProducts,
            handleCheckRow,
            start,
            pageSize,
            sortField,
            sortDescending
        } = this.props;

        const { headerRowChecked } = this.state;
        const productsList = renderedProducts.slice(start, pageSize + start).map(productID => {
            const product = products[productID];
            const isEditable = product.isChecked;
            const key = `product-${productID}`;
            return (
                <div className={styles.productRow} key={key}>
                    <input
                        type="checkbox"
                        className={styles.column5}
                        checked={product.isChecked}
                        onChange={() => handleCheckRow(productID)}
                    />
                    <span className={styles.column35}>
                        <img src={product.thumbnail} alt="" />
                        <span>{
                            (isEditable)
                                ? editableField(productID, 'name', product.name, key, this.onChangeField)
                                : product.name
                        }</span>
                    </span>
                    <span className={styles.column20}>{
                        (isEditable)
                            ? editableField(productID, 'type', product.type, key, this.onChangeField)
                            : product.type
                    }</span>
                    <span className={styles.column20}>{
                        (isEditable)
                            ? editableField(productID, 'price', product.price, key, this.onChangeField)
                            : product.price
                    }</span>
                    <span className={styles.column20}>{
                        (isEditable)
                            ? editableField(productID, 'inventory', product.inventory, key, this.onChangeField)
                            : product.inventory
                    }</span>
                </div>
            );
        });

        return (
            <div className={styles.container}>
                <div className={styles.headerRow}>
                    <input
                        type="checkbox"
                        className={styles.column5}
                        checked={headerRowChecked}
                        onChange={this.onCheckHeaderRow}
                    />
                    <span className={styles.column35} onClick={this.onSortBy.bind(this, 'name')}>
                        {copy.fieldHeaderName}
                        {getSortArrow('name', sortField, sortDescending)}
                    </span>
                    <span className={styles.column20} onClick={this.onSortBy.bind(this, 'type')}>
                        {copy.fieldHeaderType}
                        {getSortArrow('type', sortField, sortDescending)}
                    </span>
                    <span className={styles.column20} onClick={this.onSortBy.bind(this, 'price')}>
                        {copy.fieldHeaderPrice}
                        {getSortArrow('price', sortField, sortDescending)}
                    </span>
                    <span className={styles.column20} onClick={this.onSortBy.bind(this, 'inventory')}>
                        {copy.fieldHeaderInventory}
                        {getSortArrow('inventory', sortField, sortDescending)}
                    </span>
                </div>
                {productsList}
            </div>
        );
    }
}

const mapDispatchToProps = actions;

const mapStateToProps = ({products, renderedProducts, start, pageSize, sortField, sortDescending}) => ({
    products,
    renderedProducts,
    start,
    pageSize,
    sortField,
    sortDescending
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
