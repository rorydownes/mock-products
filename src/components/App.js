import React, { Component } from 'react';
import ProductsContainer from './ProductsContainer';
import PaginationControls from './PaginationControls';
import Header from './Header';
import services from '../services';
import Spinner from 'react-icons/lib/fa/spinner';
// import { products } from "../services/mockData";

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
        this.props.startFetchingProducts();
        this.fetchProducts();
    }

    fetchProducts() {
        services.fetchProducts().then(products => {
            this.props.fetchProducts(products);
        });
    }

    handleCheckRow(productID) {
        this.props.selectRow(productID);
    }

    handleSearchTextChange(e) {
        this.props.search(e.target.value);
    }

    render() {
        if (this.props.isFetching) {
            return (
                <div className={styles.spinnerContainer}>
                    <Spinner className={styles.spinner} />
                </div>
            );
        }
        return (
            <div className={styles.app}>
                <Header />
                <div className={styles.searchRow}>
                    <input
                        type="text"
                        className={styles.searchBox}
                        placeholder={copy.txtSearchPlaceholder}
                        value={this.props.searchQuery}
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
        isFetching: state.isFetching,
        searchQuery: state.searchQuery
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
