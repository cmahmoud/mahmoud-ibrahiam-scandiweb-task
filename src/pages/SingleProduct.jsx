import withRouter from "components/withRouter";
import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addToCart } from "state/marketSlice";
import AttributesList from "components/AttributesList";

const Container = styled.div`
    display: flex;
    gap: 2rem;
    margin: 2rem 0;
`;
const ImageGallery = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 5%;
    img {
        width: 5rem;
        height: 5rem;
    }
`;
const ProductPreview = styled.div`
    width: 55%;
    height: 511px;
    margin-right: 2rem;
    img {
        width: 100%;
        max-height: 100%;
        object-fit: cover;
        object-position: top;
    }
`;
const ProductDetails = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 30%;
    h3 {
        margin-bottom: 1.5rem;
    }
    .product__price {
        p {
            font-weight: 700;
            margin-bottom: 0.5rem;
        }
    }
    button {
        background: var(--green);
        color: white;
        border: 0;
        padding: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        cursor: pointer;
    }
`;

class SingleProduct extends Component {
    handleAddToCart(e, product) {
        e.preventDefault();
        const formData = Object.fromEntries(new FormData(e.target).entries());
        this.props.addToCart({ ...product, attrs: { ...formData } });
    }
    render() {
        const { id } = this.props.params;
        const product = this.props.products.find(
            (product) => product.id === id
        );
        const price = product?.prices.find(
            (price) => price.currency.label === this.props.currentCurrency.label
        );
        return (
            product && (
                <Container>
                    <ImageGallery>
                        {product.gallery.map((image, idx) => (
                            <img key={idx} src={image} alt={product.name} />
                        ))}
                    </ImageGallery>
                    <ProductPreview>
                        <img src={product.gallery[0]} alt={product.name} />
                    </ProductPreview>
                    <ProductDetails
                        onSubmit={(e) => this.handleAddToCart(e, product)}
                    >
                        <h2>{product.brand}</h2>
                        <h3>{product.name}</h3>
                        {product.attributes?.map((attribute, idx) => (
                            <AttributesList
                                name={attribute.name}
                                items={attribute.items}
                                productName={product.name}
                                key={idx}
                            />
                        ))}
                        <div className="product__price">
                            <p>Price:</p>
                            <p>
                                {price.currency.symbol} {price.amount}
                            </p>
                        </div>
                        <button type="submit">Add To Cart</button>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        />
                    </ProductDetails>
                </Container>
            )
        );
    }
}
const mapStateToProps = (state) => ({
    products: state.market.category.products,
    currentCurrency: state.market.currentCurrency,
});
const mapDispatchToProps = { addToCart };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withRouter(SingleProduct));
