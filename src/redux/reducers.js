import actions from './actionConstants.json';
import { PAGE_SIZES } from '../utils/constants';

const initialState = {
    isFetching: false,
    searchQuery: '',
    headerRowChecked: false,
    products: {},
    renderedProducts: [],
    visibleProducts: [],
    start: 0,
    pageSize: PAGE_SIZES[0],
    sortField: "",
    sortDescending: true
};

const productState = () => ({
    isChecked: false
});

const matchesSearch = (data, query) => data.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1;

const reducer = (state = initialState, action) => {
    console.log(action);
    switch (action.type) {
        case actions.search:
            const products = state.products;
            let renderedProducts = Object.keys(products).filter(cur => {
                return (products[cur] && products[cur].name && products[cur].price
                    && (matchesSearch(products[cur].name, action.query) || matchesSearch(products[cur].price, action.query)));
            });
            return {...state, searchQuery: action.query, renderedProducts, start: initialState.start};

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
            return {...state, products: {...state.products, [action.productID]: {...product, isChecked: !product.isChecked}}};

        case actions.changePageSize:
            return {...state, pageSize: parseInt(action.pageSize, 10), start: initialState.start};

        case actions.changePageNumber:
            return {...state, start: action.pageNumber*state.pageSize};

        case actions.changeSortField:
            if (state.sortField === action.fieldName) {
                return {...state, sortDescending: !state.sortDescending}
            } else {
                return {...state, sortField: action.fieldName}
            }
        default:
            return state;
    }
};


export default reducer;
