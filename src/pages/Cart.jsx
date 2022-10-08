import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MinusIcon from "icons/MinusIcon";
import PlusIcon from "icons/PlusIcon";
import { removeFromCart, addToCart } from "state/marketSlice";
import AttributesList from "components/AttributesList";

const Title = styled.h2`
    font-weight: 500;
    margin: 3rem 0;
    text-transform: uppercase;
`;
const Table = styled.table`
    border-collapse: separate;
    border-spacing: 6px 4px;
    margin-bottom: 0.5rem;
    .result {
        font-weight: 700;
    }
`;
const ProductList = styled.div`
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    & > * {
        border-style: solid;
        border-color: var(--lt-color-gray-300);
        border-right-width: 0px;
        border-left-width: 0px;
        border-top-width: 1px;
        border-bottom-width: 1px;
    }
    & > * + * {
        border-style: solid;
        border-color: var(--lt-color-gray-300);
        border-right-width: 0px;
        border-left-width: 0px;
        border-top-width: 0px;
        border-bottom-width: 1px;
    }
`;
const ProductCard = styled.div`
    padding: 0.75rem 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    .product__details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        .title {
            font-weight: 400;
        }
    }
    .product__preview {
        display: flex;
        gap: 0.5rem;
        .img {
            width: 150px;
            height: auto;
            object-fit: cover;
        }
        .control {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            alig-items: center;
            span {
                text-align: center;
            }
            button {
                border: 1px solid var(--black);
                display: flex;
                align-items: center;
                justify-content: center;
                width: 1.5rem;
                height: 1.5rem;
                background: #fff;
            }
        }
    }
`;
const OrderButton = styled.button`
    background: var(--green);
    color: #fff;
    text-transform: uppercase;
    border: 0;
    width: 16rem;
    height: 2rem;
    margin-bottom: 2rem;
`;

class Cart extends Component {
    render() {
        const { cart, currentCurrency } = this.props;
        const productsCount = cart.reduce((acc, item) => acc + item.qty, 0);
        const totalPrice = cart.reduce((acc, item) => {
            const price = item.prices.find(
                (price) => price.currency.label === currentCurrency.label
            );
            return acc + Number(item.qty) * Number(price.amount);
        }, 0);
        const totalTax = totalPrice * 0.21;
        return (
            <div>
                <Title>Cart</Title>
                <ProductList>
                    {cart?.map((product, idx) => {
                        const price = product.prices?.find(
                            (price) =>
                                price.currency.label === currentCurrency.label
                        );
                        return (
                            <ProductCard key={idx}>
                                <div className="product__details">
                                    <h2>{product.brand}</h2>
                                    <h3 className="title">{product.name}</h3>
                                    <h4>
                                        {price.currency.symbol}
                                        {price.amount}
                                    </h4>
                                    {product.attributes?.map(
                                        (attribute, idx) => (
                                            <AttributesList
                                                name={attribute.name}
                                                items={attribute.items}
                                                productName={product.name}
                                                key={idx}
                                            />
                                        )
                                    )}
                                </div>
                                <div className="product__preview">
                                    <div className="control">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.props.addToCart(product)
                                            }
                                        >
                                            <PlusIcon />
                                        </button>
                                        <span>{product.qty}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                this.props.removeFromCart(
                                                    product
                                                )
                                            }
                                        >
                                            <MinusIcon />
                                        </button>
                                    </div>
                                    <img
                                        src={product.gallery[0]}
                                        alt={product.name}
                                        className="img"
                                    />
                                </div>
                            </ProductCard>
                        );
                    })}
                </ProductList>
                <Table>
                    <tbody>
                        <tr>
                            <td>Tax 21%:</td>
                            <td className="result">
                                {currentCurrency.symbol}
                                {totalTax.toFixed(2)}
                            </td>
                        </tr>
                        <tr>
                            <td>Quantity:</td>
                            <td className="result">{productsCount}</td>
                        </tr>
                        <tr>
                            <td>Total:</td>
                            <td className="result">
                                {currentCurrency.symbol}
                                {totalPrice.toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </Table>
                <OrderButton>Order</OrderButton>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    cart: state.market.cart,
    currentCurrency: state.market.currentCurrency,
});
const mapDispatchToProps = { removeFromCart, addToCart };
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
