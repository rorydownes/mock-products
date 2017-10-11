import React, {Component} from 'react';
import { connect } from 'react-redux';
import styles from './ProductsContainer.scss';
import copy from '../utils/copy.json';
import classnames from 'classnames';

import actions from '../redux/actionCreators';

import EditableField from './EditableField';
import SortArrow from './SortArrow';

class ProductsContainer extends Component {
    constructor(props) {
        super(props);

        this.onCheckHeaderRow = this.onCheckHeaderRow.bind(this);
        this.onChangeField = this.onChangeField.bind(this);
    }

    onCheckHeaderRow() {
        this.props.selectAllRows();
    }

    onChangeField(productID, fieldName, fieldValue) {
        this.props.editField(productID, fieldName, fieldValue);
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
            sortDescending,
            headerRowChecked
        } = this.props;

        const productsList = renderedProducts.slice(start, pageSize + start).map(productID => {
            const product = products[productID];
            const isEditable = product.isChecked;
            const key = `product-${productID}`;
            const rowClassName = classnames(styles.productRow, {[styles.checkedRow]: isEditable});
            return (
                <div className={rowClassName} key={key}>
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
                                ? <EditableField
                                    productID={productID}
                                    fieldName="name"
                                    fieldValue={product.name}
                                    uniqueKey={key}
                                    onChange={this.onChangeField}
                                    validationError={product.validationErrors.name}
                                /> : product.name
                        }</span>
                    </span>
                    <span className={styles.column20}>{
                        (isEditable)
                            ? <EditableField
                                productID={productID}
                                fieldName="type"
                                fieldValue={product.type}
                                uniqueKey={key}
                                onChange={this.onChangeField}
                                validationError={product.validationErrors.type}
                            /> : product.type
                    }</span>
                    <span className={styles.column20}>{
                        (isEditable)
                            ? <EditableField
                                productID={productID}
                                fieldName="price"
                                fieldValue={product.price}
                                uniqueKey={key}
                                onChange={this.onChangeField}
                                validationError={product.validationErrors.price}
                            /> : `$${parseFloat(product.price).toFixed(2)}`
                    }</span>
                    <span className={styles.column20}>{
                        (isEditable)
                            ? <EditableField
                                productID={productID}
                                fieldName="inventory"
                                fieldValue={product.inventory}
                                uniqueKey={key}
                                onChange={this.onChangeField}
                                validationError={product.validationErrors.inventory}
                            /> : product.inventory
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
                        <SortArrow fieldName="name" sortField={sortField} isDescending={sortDescending} />
                    </span>
                    <span className={styles.column20} onClick={this.onSortBy.bind(this, 'type')}>
                        {copy.fieldHeaderType}
                        <SortArrow fieldName="type" sortField={sortField} isDescending={sortDescending} />
                    </span>
                    <span className={styles.column20} onClick={this.onSortBy.bind(this, 'price')}>
                        {copy.fieldHeaderPrice}
                        <SortArrow fieldName="price" sortField={sortField} isDescending={sortDescending} />
                    </span>
                    <span className={styles.column20} onClick={this.onSortBy.bind(this, 'inventory')}>
                        {copy.fieldHeaderInventory}
                        <SortArrow fieldName="inventory" sortField={sortField} isDescending={sortDescending} />
                    </span>
                </div>
                {productsList.length ? productsList : <div className={styles.noResultsFound}>{copy.noResultsFound}</div>}
            </div>
        );
    }
}

const mapDispatchToProps = actions;

const mapStateToProps = ({ products, renderedProducts, start, pageSize, sortField, sortDescending, headerRowChecked }) => ({
    products,
    renderedProducts,
    start,
    pageSize,
    sortField,
    sortDescending,
    headerRowChecked
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductsContainer);
