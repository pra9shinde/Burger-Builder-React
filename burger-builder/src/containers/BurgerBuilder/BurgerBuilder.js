import React, { Component } from 'react';
import axios from '../../axios-orders';

// Redux
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

// Higher Order Component
import Aux from '../../hoc/Auxilary/Auxilary';

// Components
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

import errorHandler from '../../hoc/errorHandler/errorHandler';

// export is just used in test.js for testing
export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((key) => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirect('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout'); //Route to checkout page
    };

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false,
        });
    };

    render() {
        const disabledInfo = { ...this.props.ings };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null; //initially no ingredients so no ordersummary

        // Assign spinner to burger comps because ingredients are fetched from DB which will take time
        let burgerComps = this.props.error ? <p style={{ textAlign: 'center' }}>Failed Loading Ingredients...</p> : <Spinner />; //redux props passed

        if (this.props.ings) {
            // When the ingredients are fetched assign burger components
            burgerComps = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded} //Received from Redux
                        ingredientRemoved={this.props.onIngredientDeleted} //Received from Redux
                        disabled={disabledInfo}
                        price={this.props.price} //Received from Redux
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        isAuthenticated={this.props.isAuthenticated} //Redux
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price} //Received from Redux
                />
            );
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burgerComps}
            </Aux>
        );
    }
}

// Redux Connection
const importReduxState = (state) => {
    //Import state obj set in redux
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        isAuthenticated: state.authReducer.token !== null,
    };
};

const exportReactProps = (dispatch) => {
    return {
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientDeleted: (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirect: (path) => dispatch(actions.setAuthRedirect(path)),
    };
};

export default connect(importReduxState, exportReactProps)(errorHandler(BurgerBuilder, axios));
