import React, { Component } from 'react';
import ProductsContainer from './ProductsContainer';
import PaginationControls from './PaginationControls';
import Header from './Header';
// import services from '../services';
import { products } from "../services/mockData"
import { PAGE_SIZES } from '../utils/constants';

import copy from '../utils/copy.json';
import styles from './App.scss';

const initialState = props => ({
    products: {},
    orderedProducts: [],
    pageSize: PAGE_SIZES[0]
});

const productState = () => ({
    isChecked: false
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = initialState(props);

        this.handleCheckRow = this.handleCheckRow.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        // services.fetchProducts
        Promise.resolve(products).then(products => {
            let productIds = [];
            const productHashMap = products.reduce((acc, cur) => {
                productIds.push(cur.id);
                return Object.assign(acc, {[cur.id]: ({...cur, ...productState()})});
            }, {});
            console.log('Fetched: ', {
                products: productHashMap,
                orderedProducts: productIds
            });
            this.setState({
                products: productHashMap,
                orderedProducts: productIds
            });
        });
    }

    handleCheckRow(productID) {
        this.setState(state => {
            debugger;
            const product = state.products[productID];
            const updatedProduct = {[productID]: Object.assign({}, product, {isChecked: !product.isChecked})};
            let newProdState = {products: {...state.products, updatedProduct}};
            return newProdState;
        });
    }

    render() {
        const {
            products,
            orderedProducts,
            pageSize,
            currentPage
        } = this.state;

        console.log(this.state);

        return (
            <div className={styles.app}>
                <div className={styles.header}>
                    <Header />
                </div>
                <div className={styles.searchRow}>
                    <input type="text" className={styles.searchBox} placeholder={copy.txtSearchPlaceholder}/>
                </div>
                <div className={styles.productTable}>
                    <ProductsContainer
                        products={products}
                        orderedProducts={orderedProducts}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        handleCheckRow={this.handleCheckRow}
                    />
                    <PaginationControls
                        products={products}
                        orderedProducts={orderedProducts}
                        pageSize={pageSize}
                        currentPage={currentPage}
                    />
                </div>
            </div>
        );
    }
}

export default App;
