import ProductList from "components/ProductList";
import { client } from "graphql/client";
import { FETCH_PRODUCTS } from "graphql/queries";
import React, { Component } from "react";
import { connect } from "react-redux";
import { setCategory } from "state/marketSlice";

class Home extends Component {
    componentDidMount() {
        client
            .query({ query: FETCH_PRODUCTS, variables: { name: "all" } })
            .then((result) => this.props.setCategory(result.data.category));
    }

    render() {
        return (
            <ProductList
                products={this.props.category.products}
                category={this.props.category.name}
            />
        );
    }
}
const mapStateToProps = (state) => ({
    category: state.market.category,
});
const mapDispatchToProps = { setCategory };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
