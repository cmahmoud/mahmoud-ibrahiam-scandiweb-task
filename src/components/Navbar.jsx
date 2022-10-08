import React, { Component } from "react";
import styled from "styled-components";
import Logo from "icons/Logo";
import CurrencySwitcher from "./CurrencySwitcher";
import MenuCart from "./MenuCart";
import { Link, NavLink } from "react-router-dom";
import { client } from "graphql/client";
import { FETCH_CATEGORIES } from "graphql/queries";

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    .nav__menu {
        display: flex;
        flex-direction: row;
        list-style: none;
        gap: 1rem;
        li a {
            text-decoration: none;
            text-transform: capitalize;
            color: var(--black);
            padding: 1rem 0;
        }
        .active {
            cursor: pointer;
            color: var(--green);
            border-bottom: 2px solid var(--green);
        }
    }
    .nav__options {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
`;

export default class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }
    componentDidMount() {
        client
            .query({ query: FETCH_CATEGORIES })
            .then((res) => this.setState({ categories: res.data.categories }));
    }
    render() {
        return (
            <Nav>
                <ul className="nav__menu">
                    {this.state.categories?.map((category, idx) => (
                        <li key={idx}>
                            <NavLink
                                to={
                                    category.name === "all"
                                        ? "/"
                                        : `/category/${category.name}`
                                }
                            >
                                {category.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
                <Link to="/">
                    <Logo />
                </Link>
                <div className="nav__options">
                    <CurrencySwitcher />
                    <MenuCart />
                </div>
            </Nav>
        );
    }
}
