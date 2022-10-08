import { gql } from "@apollo/client";

export const FETCH_PRODUCTS = gql`
    query getProducts($name: String!) {
        category(input: { title: $name }) {
            name
            products {
                id
                name
                prices {
                    currency {
                        label
                        symbol
                    }
                    amount
                }
                brand
                inStock
                gallery
                category
                description
                attributes {
                    id
                    name
                    items {
                        displayValue
                        value
                        id
                    }
                }
            }
        }
    }
`;
export const FETCH_CURRENCIES = gql`
    query getCurrencies {
        currencies {
            label
            symbol
        }
    }
`;
export const FETCH_CATEGORIES = gql`
    query getCatogries {
        categories {
            name
        }
    }
`;
