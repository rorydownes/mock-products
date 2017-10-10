import endpoints from './endpoints';

const fetchProducts = () => {
    return fetch(endpoints.products())
        .then(response => response.json())
        .catch(error => console.error(`Service Error: Couldn't fetch products - ${error.message}`));
};

export default {
    fetchProducts
};
