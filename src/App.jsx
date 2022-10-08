import Navbar from "components/Navbar";
import Cart from "pages/Cart";
import Home from "pages/Home";
import SingleProduct from "pages/SingleProduct";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import PropagateLoader from "react-spinners/PropagateLoader";
import Category from "pages/Category";

const Container = styled.div`
    margin: 0px auto;
    padding: 0 5rem;
    @media (max-width: 768px) {
        padding: 0 1rem;
    }
`;
const LoaderContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
        };
    }
    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1000);
    }
    render() {
        return this.state.loading ? (
            <LoaderContainer>
                <PropagateLoader color="#5ece7b" loading={this.state.loading} />
            </LoaderContainer>
        ) : (
            <BrowserRouter>
                <Container>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route
                            path="/product/:id"
                            element={<SingleProduct />}
                        />
                        <Route path="/category/:name" element={<Category />} />
                    </Routes>
                </Container>
            </BrowserRouter>
        );
    }
}
