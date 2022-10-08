import { client } from "graphql/client";
import { FETCH_CURRENCIES } from "graphql/queries";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setCurrencies, setCurrentCurrency } from "state/marketSlice";
import Select from "react-select";
import styled from "styled-components";

const SelectElement = styled(Select)`
    .currency__switcher__control {
        padding: 0rem 0.5rem;
        border: 0;
        outline: none;
        cursor: pointer;
    }
    .currency__switcher__option {
        font-weight: 600;
    }
`;

class CurrencySwitcher extends Component {
    componentDidMount() {
        client
            .query({ query: FETCH_CURRENCIES })
            .then((res) => this.props.setCurrencies(res.data.currencies));
    }
    modifyCurrencies() {
        const currencies = this.props.currencies.map((item) => ({
            value: item.label,
            label: `${item.symbol} ${item.label}`,
            key: item.symbol,
        }));
        return currencies;
    }
    render() {
        return (
            <div>
                <SelectElement
                    classNamePrefix="currency__switcher"
                    placeholder={this.props.currentCurrency.label}
                    value={this.props.currentCurrency.label}
                    options={this.modifyCurrencies()}
                    onChange={({ value, key }) => {
                        this.props.setCurrentCurrency({
                            label: value,
                            symbol: key,
                        });
                    }}
                />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    currencies: state.market.currencies,
    currentCurrency: state.market.currentCurrency,
});
const mapDispatchToProps = { setCurrencies, setCurrentCurrency };

export default connect(mapStateToProps, mapDispatchToProps)(CurrencySwitcher);
