import CartIcon from "icons/CartIcon";
import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import MinusIcon from "icons/MinusIcon";
import PlusIcon from "icons/PlusIcon";
import { removeFromCart, addToCart } from "state/marketSlice";
import withRouter from "./withRouter";
import AttributesList from "./AttributesList";

const CartDropdown = styled.div`
    postion: relative;
    display: inline-block;
    button {
        border: 0;
        background: #fff;
        cursor: pointer;
        position: relative;
        .counter {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: -7px;
            right: -10px;
            background: var(--black);
            color: #fff;
            width: 1.2rem;
            height: 1.2rem;
            border-radius: 50%;
        }
    }
    .dropdown {
        display: none;
        position: fixed;
        top: 3.5rem;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.75);
        opacity: 0;
        pointer-events: none;
        transition: opacity 250ms ease;
        .cart {
            position: absolute;
            right: 5rem;
            top: 0;
            margin: auto;
            width: 30%;
            max-width: 30rem;
            background-color: white;
            display: flex;
            flex-direction: column;
            padding: 1rem;
            gap: 1rem;
            .cart__title {
                margin: 0.5rem 0;
            }
            .cart__footer {
                width: 100%;
                display: flex;
                gap: 0.5rem;
                button[type="button"] {
                    color: var(--black);
                    border: 1px solid var(--black);
                }
                button[type="submit"] {
                    background: var(--green);
                    color: #fff;
                    &:disabled {
                        background: var(--gray);
                        opacity: 0.8;
                    }
                }
                button,
                a {
                    width: 50%;
                    text-transform: uppercase;
                    padding: 0.5rem;
                }
            }
        }
    }
    .show {
        display: flex;
        opacity: 1;
        pointer-events: all;
    }
`;
const ProductCard = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0px;
    width: 100%;
`;
const CardMeta = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;
const CardControl = styled.div`
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
        }
    }
`;
class MenuCart extends Component {
    constructor(props) {
        super(props);
        this.dropdown = React.createRef();
    }
    handleCheckOut(e, product) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target).entries());
        console.log(formData);
    }
    render() {
        return (
            <CartDropdown>
                <button
                    onClick={() =>
                        this.dropdown.current.classList.toggle("show")
                    }
                >
                    <CartIcon />
                    <div className="counter">{this.props.cart.length}</div>
                </button>
                <div className="dropdown" ref={this.dropdown}>
                    <form
                        className="cart"
                        onSubmit={(e) => this.handleCheckOut(e)}
                    >
                        <h5 className="cart__title">
                            My Bag:{" "}
                            {this.props.cart.reduce(
                                (acc, item) => acc + item.qty,
                                0
                            )}{" "}
                            items
                        </h5>
                        {this.props.cart?.map((product, idx) => {
                            const price = product.prices?.find(
                                (price) =>
                                    price.currency.label ===
                                    this.props.currentCurrency.label
                            );
                            return (
                                <ProductCard key={idx}>
                                    <CardMeta>
                                        <h4>{product.brand}</h4>
                                        <h5>{product.name}</h5>
                                        <h6>
                                            {price.currency.symbol}{" "}
                                            {price.amount}
                                        </h6>
                                        {product.attributes?.map(
                                            (attribute, idx) => (
                                                <AttributesList
                                                    name={attribute.name}
                                                    items={attribute.items}
                                                    key={idx}
                                                    productName={product.name}
                                                    sm
                                                />
                                            )
                                        )}
                                    </CardMeta>
                                    <CardControl>
                                        <div className="control">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    this.props.addToCart(
                                                        product
                                                    )
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
                                    </CardControl>
                                </ProductCard>
                            );
                        })}
                        <div className="cart__footer">
                            <button
                                type="button"
                                onClick={() => {
                                    this.props.navigate("/cart");
                                    this.dropdown.current.classList.toggle(
                                        "show"
                                    );
                                }}
                            >
                                View Bag
                            </button>
                            <button
                                disabled={this.props.cart.length === 0}
                                type="submit"
                            >
                                Checkout
                            </button>
                        </div>
                    </form>
                </div>
            </CartDropdown>
        );
    }
}
const mapStateToProps = (state) => ({
    cart: state.market.cart,
    currentCurrency: state.market.currentCurrency,
});
const mapDispatchToProps = { removeFromCart, addToCart };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(MenuCart));
