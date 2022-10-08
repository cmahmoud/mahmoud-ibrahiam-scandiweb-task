import React, { Component } from "react";
import styled from "styled-components";
import CartIcon from "icons/CartIcon";
import { connect } from "react-redux";
import { addToCart } from "state/marketSlice";
import { Link } from "react-router-dom";

const ProductsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 2rem;
    margin-bottom: 1rem;
    @media (max-width: 768px) {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
`;
const ProductCard = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    position: relative;
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    &:hover {
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    &:hover > .card__button {
        display: flex;
    }
`;
const ProductHeader = styled.div`
    width: 100%;
    position: relative;
    display: flex;
    margin-bottom: 1.5rem;
    text-align: center;
    .overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-transform: uppercase;
        color: var(--gray);
        font-size: 1.2rem;
    }
`;
const HeaderImage = styled.img`
    width: 100%;
    max-height: 16rem;
    object-fit: cover;
    object-position: top;
    opacity: ${(props) => (props.inStock ? "1" : "0.3")};
    background: ${(props) => (props.inStock ? "#fff" : "#fff")};
`;
const ProductTitle = styled.h2`
    font-size: 1.1rem;
    color: var(--black);
    margin-bottom: 0.5rem;
    a {
        color: var(--black);
        text-decoration: none;
    }
`;
const ProductPrice = styled.h5`
    display: flex;
    gap: 0.1rem;
`;
const ProductCardButton = styled.button`
    position: absolute;
    border-radius: 50%;
    outline: none;
    border: 0;
    background: var(--green);
    display: none;
    align-items: center;
    justify-content: center;
    padding: 0.8rem;
    bottom: 50px;
    right: 30px;
    cursor: pointer;
    &:disabled {
        background: var(--black);
    }
`;
const Title = styled.h2`
    font-weight: 500;
    margin: 3rem 0;
    text-transform: capitalize;
`;

class ProductList extends Component {
    render() {
        return (
            <>
                <Title>{this.props.category}</Title>
                <ProductsContainer>
                    {this.props.products?.map((product, idx) => {
                        const price = product.prices?.find(
                            (price) =>
                                price.currency.label ===
                                this.props.currentCurrency.label
                        );
                        return (
                            <ProductCard key={idx}>
                                <ProductHeader>
                                    <HeaderImage
                                        alt={product.name}
                                        src={product.gallery[0]}
                                        inStock={product.inStock}
                                    />
                                    {!product.inStock && (
                                        <h5 className="overlay">
                                            Out Of Stock
                                        </h5>
                                    )}
                                </ProductHeader>
                                <ProductTitle>
                                    <Link to={`/product/${product.id}`}>
                                        {product.name}
                                    </Link>
                                </ProductTitle>
                                <ProductPrice>
                                    <span>{price.currency.symbol}</span>
                                    <span>{price.amount}</span>
                                </ProductPrice>
                                {product.inStock && (
                                    <ProductCardButton
                                        className="card__button"
                                        onClick={() =>
                                            this.props.addToCart(product)
                                        }
                                    >
                                        <CartIcon fill="#fff" />
                                    </ProductCardButton>
                                )}
                            </ProductCard>
                        );
                    })}
                </ProductsContainer>
            </>
        );
    }
}
const mapStateToProps = (state) => ({
    currentCurrency: state.market.currentCurrency,
});
const mapDispatchToProps = { addToCart };

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
