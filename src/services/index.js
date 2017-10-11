import endpoints from './endpoints';

const fetchProducts = () => {
    return fetch(endpoints.products())
        .then(response => response.json())
        .catch(error => console.error(`Service Error: Couldn't fetch products - ${error.message}`));
};

const saveProduct = (product) => {
    return fetch(endpoints.product(product.id), {method: 'PUT', body: JSON.stringify(product)})
        .then(response => response.json())
        .catch(error => console.error(`Service Error - Couldn't save product - ${error.message}`));
};

export default {
    fetchProducts,
    saveProduct
};
