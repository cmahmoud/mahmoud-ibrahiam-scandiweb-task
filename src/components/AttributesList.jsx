import React, { Component } from "react";
import styled from "styled-components";
import { setProductAttrs } from "state/marketSlice";
import { connect } from "react-redux";

const AttributeContainer = styled.div`
    margin-bottom: 1rem;
    h4 {
        margin-bottom: 1rem;
        font-weight: 700;
    }
    .input__wrapper {
        display: flex;
        gap: 1rem;
        input {
            display: none;
        }
        label {
            padding: ${(props) => (props.sm ? "0.1rem 0.5rem" : "0.5rem 1rem")};
            border: 1px solid var(--black);
            cursor: pointer;
        }
        input:checked + label {
            background: var(--black);
            color: #fff;
        }
    }
    .color__input {
        input:checked + label {
            outline: 3px solid var(--green);
        }
    }
`;

class AttributesList extends Component {
    render() {
        const random = (Math.random() + 1).toString(36).substring(7);
        const { name, items, sm, productName, setProductAttrs, cart } =
            this.props;
        const product = cart.find((item) => item.name === productName);
        const slug =
            productName.split(" ").join("-").toLowerCase() +
            name.split(" ").join("-").toLowerCase();
        return (
            <AttributeContainer sm={sm}>
                <h4>{name}:</h4>
                <div className="input__wrapper">
                    {items.map((item, idx) => (
                        <div
                            className={
                                name === "Color" ? "color__input" : "default"
                            }
                            key={idx}
                        >
                            <input
                                type="radio"
                                name={slug}
                                id={`${slug}${random}${idx}`}
                                value={item.value}
                                checked={
                                    product.attrs
                                        ? product.attrs[slug] === item.value
                                        : idx === 0
                                }
                                onChange={(e) =>
                                    setProductAttrs({
                                        name: productName,
                                        attrs: {
                                            [slug]: e.target.value,
                                        },
                                    })
                                }
                            />
                            <label
                                style={{
                                    background: name === "Color" && item.value,
                                }}
                                htmlFor={`${slug}${random}${idx}`}
                            >
                                {name === "Color" ? "" : item.displayValue}
                            </label>
                        </div>
                    ))}
                </div>
            </AttributeContainer>
        );
    }
}
AttributesList.defaultProps = { sm: false, productName: "" };

const mapStateToProps = (state) => ({
    cart: state.market.cart,
});
const mapDispatchToProps = { setProductAttrs };
export default connect(mapStateToProps, mapDispatchToProps)(AttributesList);
