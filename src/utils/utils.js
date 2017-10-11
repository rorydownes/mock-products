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

const validateProduct = (product) => {
    let errors = {};
    if (!product.name) {
        errors['name'] = 'Required';
    }
    if (!product.inventory || !Number.isInteger(product.inventory) || product.inventory < 0) {
        errors['inventory'] = 'Integer >= 0';
    }
    if (!product.price || !parseFloat(product.price) || product.price < 0) {
        errors['price'] = 'Numeric >= 0';
    }
    return errors;
};

export {
    sortRenderedProducts,
    matchesSearch,
    validateProduct
};
