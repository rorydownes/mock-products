import React, { Component } from 'react';
import ProductsContainer from './ProductsContainer';
import PaginationControls from './PaginationControls';
import Header from './Header';
// import services from '../services';
import { products } from "../services/mockData";

import copy from '../utils/copy.json';
import styles from './App.scss';

import { connect } from 'react-redux';
import actions from '../redux/actionCreators';

class App extends Component {
    constructor(props) {
        super(props);

        this.handleCheckRow = this.handleCheckRow.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    componentDidMount() {
        this.fetchProducts();
    }

    fetchProducts() {
        const { fetchProducts, startFetchingProducts } = this.props;
        startFetchingProducts();
        // services.fetchProducts
        Promise.resolve(products).then(products => {
            fetchProducts(products);
        });
    }

    handleCheckRow(productID) {
        this.props.selectRow(productID);
    }

    handleSearchTextChange(e) {
        this.props.search(e.target.value);
    }

    render() {
        const {
            searchQuery,
        } = this.props;

        return (
            <div className={styles.app}>
                <div className={styles.header}>
                    <Header />
                </div>
                <div className={styles.searchRow}>
                    <input
                        type="text"
                        className={styles.searchBox}
                        placeholder={copy.txtSearchPlaceholder}
                        value={searchQuery}
                        onChange={this.handleSearchTextChange}
                    />
                </div>
                <div className={styles.productTable}>
                    <ProductsContainer
                        handleCheckRow={this.handleCheckRow}
                    />
                    <PaginationControls />
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = actions;

const mapStateToProps = state => {
    return {
        searchQuery: state.searchQuery
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
