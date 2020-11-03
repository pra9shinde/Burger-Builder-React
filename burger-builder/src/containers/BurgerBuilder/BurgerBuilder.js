import React, { Component } from "react";

import Aux from "../../hoc/Auxilary/Auxilary";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";

import axios from "../../axios-orders";

import errorHandler from "../../hoc/errorHandler/errorHandler";

const INGREDIENT_PRICES = {
    salad: 5,
    bacon: 15,
    cheese: 15,
    meat: 15,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 25,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    };

    componentDidMount() {
        // Fetch ingredients from firebase DB
        axios
            .get("https://burger-builder-77b5d.firebaseio.com/ingredients.json")
            .then((response) => {
                this.setState({ ingredients: response.data });
            })
            .catch((e) => {
                console.log(e);
                this.setState({ error: true });
            });
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasable: sum > 0 });
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;

        const updateIngredient = { ...this.state.ingredients };

        updateIngredient[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredient,
        });
        this.updatePurchaseState(updateIngredient);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;

        const updateIngredient = { ...this.state.ingredients };

        updateIngredient[type] = updatedCount;
        const priceSubtraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubtraction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updateIngredient,
        });
        this.updatePurchaseState(updateIngredient);
    };

    purchaseHandler = () => {
        this.setState({
            purchasing: true,
        });
    };

    purchaseContinueHandler = () => {
        let queryParams = [];

        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) +
                    "=" +
                    encodeURIComponent(this.state.ingredients[i])
            );
        }

        queryParams.push("price=" + this.state.totalPrice);
        const queryString = queryParams.join("&");
        // pass the ingredients value in url
        this.props.history.push({
            pathname: "/checkout",
            search: "?" + queryString,
        }); //Route to checkout page
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    };

    render() {
        const disabledInfo = { ...this.state.ingredients };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null; //initially no ingredients so no ordersummary

        // Assign spinner to burger comps because ingredients are fetched from DB which will take time
        let burgerComps = this.state.error ? (
            <p style={{ textAlign: "center" }}>Failed Loading Ingredients...</p>
        ) : (
            <Spinner />
        );

        if (this.state.ingredients) {
            // When the ingredients are fetched assign burger components
            burgerComps = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice}
                />
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burgerComps}
            </Aux>
        );
    }
}

export default errorHandler(BurgerBuilder, axios);
