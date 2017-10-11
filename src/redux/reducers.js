import actions from './actionConstants.json';
import { PAGE_SIZES } from '../utils/constants';

const initialState = {
    isFetching: false,
    searchQuery: '',
    headerRowChecked: false,
    products: {},
    renderedProducts: [],
    start: 0,
    pageSize: PAGE_SIZES[0],
    sortField: "",
    sortDescending: true
};

const productState = () => ({
    isChecked: false
});

const sortRenderedProducts = (products, renderedProducts, sortField, reverseSorted) => {
    const sorted = renderedProducts.sort((a, b) => {
        let sortValueA = products[a][sortField];
        let sortValueB = products[b][sortField];

        if (typeof sortValueA === 'string' || typeof sortValueB === 'string') {
            sortValueA = sortValueA.toString().toLowerCase();
            sortValueB = sortValueB.toString().toLowerCase();
        }

        if (sortValueA < sortValueB) {
            return 1;
        }
        if (sortValueA > sortValueB) {
            return -1;
        }
        return 0;
    });
    return reverseSorted ? sorted.reverse() : sorted;
};

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
            return {...state, products: {...state.products, [action.productID]: {...product, isChecked: !product.isChecked}}};

        case actions.selectAllRows:
            const isHeaderRowNowChecked = !state.headerRowChecked;
            let newProducts = {...state.products};

            state.renderedProducts.forEach(productID => {
                newProducts[productID] = {...newProducts[productID], isChecked: isHeaderRowNowChecked}
            });

            return {...state, headerRowChecked: isHeaderRowNowChecked, products: newProducts};

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

        default:
            return state;
    }
};


export default reducer;
