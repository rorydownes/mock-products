import actionConstants from './actionConstants.json';

const actions = {
    startFetchingProducts: () => ({ type: actionConstants.startFetchProducts }),
    fetchProducts: (products) => ({ type: actionConstants.fetchProducts, products }),

    selectAllRows: () => ({ type: actionConstants.selectAllRows }),
    selectRow: (productID) => ({ type: actionConstants.selectRow, productID }),

    search: (query) => ({ type: actionConstants.search, query }),
    sortBy: (fieldName) => ({ type: actionConstants.changeSortField, fieldName }),
    changePageSize: (pageSize) => ({ type: actionConstants.changePageSize, pageSize }),
    changePageNumber: (pageNumber) => ({ type: actionConstants.changePageNumber, pageNumber }),

    editField: (productID, fieldName, fieldValue) => ({ type: actionConstants.editField, productID, fieldName, fieldValue})
};

export default actions;
