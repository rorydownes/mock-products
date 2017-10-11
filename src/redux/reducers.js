import actions from './actionConstants.json';
import { PAGE_SIZES } from '../utils/constants';
import {sortRenderedProducts, matchesSearch, validateProduct} from "../utils/utils";
import services from '../services';

const initialState = {
    isFetching: false,
    searchQuery: '',
    headerRowChecked: false,
    products: {},
    renderedProducts: [],
    start: 0,
    pageSize: PAGE_SIZES[0],
    sortField: "",
    sortDescending: true,
    flaggedForSave: []
};

const productState = () => ({
    isChecked: false,
    hasPendingChanges: false,
    validationErrors: {}
});

const deSelectRow = (product, allChecked) => {
    let validationErrors = {...product}.validationErrors;
    let isNowChecked = product.isChecked;
    if (product.isChecked) {
        validationErrors = validateProduct(product);
        if (!Object.keys(validationErrors).length) {
            isNowChecked = allChecked || !product.isChecked;
        }
    } else {
        isNowChecked = allChecked || !product.isChecked;
    }
    if (!isNowChecked && product.hasPendingChanges) {
        services.saveProduct(product);
    }
    return {...product, isChecked: isNowChecked, validationErrors, hasPendingChanges: false };
};

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actions.search:
            const products = state.products;
            let renderedProducts = Object.keys(products).filter(cur => {
                return (products[cur] && products[cur].name && products[cur].price
                    && (matchesSearch(products[cur].name, action.query) || matchesSearch(products[cur].price, action.query)));
            });

            renderedProducts = sortRenderedProducts(state.products, renderedProducts, state.sortField, !state.sortDescending);

            return {
                ...state,
                searchQuery: action.query,
                renderedProducts: renderedProducts,
                start: initialState.start
            };

        case actions.fetchProducts:
            let productIds = [];
            const productHashMap = action.products.reduce((acc, cur) => {
                productIds.push(cur.id);
                return Object.assign(acc, {[cur.id]: ({...cur, ...productState()})});
            }, {});
            return {...state, isFetching: false, products: productHashMap, renderedProducts: productIds};

        case actions.startFetchingProducts:
            return {...state, isFetching: true};

        case actions.selectRow:
            const product = state.products[action.productID];
            return {...state, products: {
                ...state.products,
                [action.productID]: deSelectRow(product)
            }};

        case actions.selectAllRows:
            const isHeaderRowNowChecked = !state.headerRowChecked;
            let nextProducts = {...state.products};

            state.renderedProducts.forEach(productID => {
                nextProducts[productID] = deSelectRow(nextProducts[productID], isHeaderRowNowChecked);
            });

            return {...state, headerRowChecked: isHeaderRowNowChecked, products: nextProducts};

        case actions.changePageSize:
            return {...state, pageSize: parseInt(action.pageSize, 10), start: initialState.start};

        case actions.changePageNumber:
            return {...state, start: action.pageNumber*state.pageSize};

        case actions.changeSortField:
            let nextState;
            if (state.sortField === action.fieldName) {
                nextState = {...state, sortDescending: !state.sortDescending};
            } else {
                nextState = {...state, sortField: action.fieldName};
            }
            if (nextState.sortField !== state.sortField) {
                nextState = {...nextState, renderedProducts: sortRenderedProducts(state.products, state.renderedProducts, nextState.sortField)};
            } else if (nextState.sortDescending !== state.sortDescending) {
                nextState = {...nextState, renderedProducts: [...state.renderedProducts].reverse()};
            }
            return nextState;

        case actions.editField:
            let editedProducts = {...state.products};
            editedProducts[action.productID] = {
                ...editedProducts[action.productID],
                [action.fieldName]: action.fieldValue,
                hasPendingChanges: true
            };
            return {...state, products: editedProducts};
        default:
            return state;
    }
};


export default reducer;
