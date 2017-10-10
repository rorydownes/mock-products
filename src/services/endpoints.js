const baseUrls = {
    mock: 'https://private-anon-6e133010ee-weeblyfrontendtrialapi.apiary-mock.com',
    prod: 'https://polls.apiblueprint.org'
};

const resources = {
    products: () => 'products',
    product: arg1 => `product/${arg1}`
};


const getEndpoints = (useMock = true) => {
    const baseUrl = useMock ? baseUrls.mock : baseUrls.prod;
    return Object.keys(resources).reduce((acc, end) => {
        return Object.assign(acc, ({
            [end]: (...args) => [baseUrl, resources[end].apply(null, args)].join('/')
        }));
    }, {});
};

export default getEndpoints(true);
