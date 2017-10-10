import React, {Component} from 'react';
import styles from './ProductsContainer.scss';

class ProductsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            headerRowChecked: false
        };

        this.onCheckHeaderRow = this.onCheckHeaderRow.bind(this);
    }

    onCheckHeaderRow() {
        this.setState(state => ({headerRowChecked: !state.headerRowChecked}));
    }

    render() {
        const { products, orderedProducts, handleCheckRow } = this.props;
        const { headerRowChecked } = this.state;

        console.log(this.state);

        const productsList = orderedProducts.map(productID => {
            const product = products[productID];
            return (
                <div className={styles.productRow} key={`product-${productID}`} onClick={e => handleCheckRow(productID)}>
                    <input type="checkbox" className={styles.column5} checked={product.isChecked} />
                    <span className={styles.column35}>{product.name}</span>
                    <span className={styles.column20}>{product.type}</span>
                    <span className={styles.column20}>{product.price}</span>
                    <span className={styles.column20}>{product.inventory}</span>
                </div>
            );
        });

        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <input type="checkbox" className={styles.column5} checked={headerRowChecked} onChange={this.onCheckHeaderRow}/>
                    <span className={styles.column35}>Name</span>
                    <span className={styles.column20}>Type</span>
                    <span className={styles.column20}>Price</span>
                    <span className={styles.column20}>Inventory</span>
                </div>
                {productsList}
            </div>
        );
    }
}

export default ProductsContainer;
