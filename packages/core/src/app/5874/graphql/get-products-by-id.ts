const getProductsByIdQuery = `#graphql
query GetProductsById($productIds: [Int!]) {
    site {
        products(entityIds: $productIds) {
            edges {
                node {
                    id
                    entityId
                    name
                    sku
                    description
                    width {
                        value
                        unit
                    }
                    height {
                        value
                        unit
                    }
                    depth {
                        value
                        unit
                    }
                    weight {
                        value
                        unit
                    }
                    prices(includeTax: true) {
                        price {
                            currencyCode
                            value
                        }
                        basePrice {
                            currencyCode
                            value
                        }
                        retailPrice {
                            currencyCode
                            value
                        }
                        salePrice {
                            currencyCode
                            value
                        }
                    }
                    customFields {
                        edges {
                            node {
                                entityId
                                name
                                value
                            }
                        }
                    }
                }
            }
        }
    }
}`;

export default getProductsByIdQuery;
