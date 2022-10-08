import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: {},
    cart: [],
    currencies: [],
    currentCurrency: { label: "USD", symbol: "$" },
};

export const marketSlice = createSlice({
    name: "market",
    initialState,
    reducers: {
        setCategory: (state, { payload }) => {
            return { ...state, category: payload };
        },
        setCurrencies: (state, { payload }) => {
            return { ...state, currencies: payload };
        },
        setCurrentCurrency: (state, { payload }) => {
            return { ...state, currentCurrency: payload };
        },
        addToCart: (state, { payload }) => {
            const product = state.cart.find((item) => item.id === payload.id);
            if (product) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, ...payload, qty: item.qty + 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: [...state.cart, { ...payload, qty: 1 }],
                };
            }
        },
        removeFromCart: (state, { payload }) => {
            const product = state.cart.find((item) => item.id === payload.id);
            if (product.qty > 1) {
                return {
                    ...state,
                    cart: state.cart.map((item) =>
                        item.id === product.id
                            ? { ...item, qty: item.qty - 1 }
                            : item
                    ),
                };
            } else {
                return {
                    ...state,
                    cart: state.cart.filter(
                        (product) => product.id !== payload.id
                    ),
                };
            }
        },
        setProductAttrs: (state, { payload }) => {
            return {
                ...state,
                cart: state.cart.map((product) =>
                    product.name === payload.name
                        ? {
                              ...product,
                              attrs: { ...product.attrs, ...payload.attrs },
                          }
                        : product
                ),
            };
        },
    },
});

export const {
    setCategory,
    setCurrencies,
    setCurrentCurrency,
    addToCart,
    removeFromCart,
    setProductAttrs,
} = marketSlice.actions;

export default marketSlice;
