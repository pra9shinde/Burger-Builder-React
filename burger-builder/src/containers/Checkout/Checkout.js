import React, { Component } from "react";
import { Route } from "react-router-dom";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./contactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice: 0,
    };

    componentDidMount() {
        let query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;

        for (let param of query.entries()) {
            // ['salad','1'] //Data format
            if (param[0] === "price") {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }

        this.setState({
            ingredients: ingredients,
            totalPrice: price,
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack(); //Send back to home page
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        let checkoutSummary = <p>loading...</p>;
        let contactData = <p>loading...</p>;
        if (this.state.ingredients) {
            checkoutSummary = (
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    onCheckoutCancelled={this.checkoutCancelledHandler}
                    onCheckoutContinued={this.checkoutContinuedHandler}
                />
            );

            contactData = (
                <ContactData
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                />
            );
        }

        return (
            <div>
                {checkoutSummary}
                <Route
                    path={this.props.match.path + "/contact-data"}
                    render={(props) => contactData}
                />
            </div>
        );
    }
}

export default Checkout;
