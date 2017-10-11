import actionConstants from './actionConstants.json';

const actions = {
    startFetchingProducts: () => ({ type: actionConstants.startFetchProducts }),
    fetchProducts: (products) => ({ type: actionConstants.fetchProducts, products }),

    selectAllRows: () => ({ type: actionConstants.seelectAllRows }),
    selectRow: (productID) => ({ type: actionConstants.selectRow, productID }),

    search: (query) => ({ type: actionConstants.search, query }),
    sortBy: (fieldName) => ({ type: actionConstants.changeSortField, fieldName }),
    selectAll: () => ({ type: actionConstants.selectAllRows })
};

export default actions;
