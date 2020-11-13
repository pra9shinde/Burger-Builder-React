import React, { Component } from 'react';

import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import witherrorHandler from '../../hoc/errorHandler/errorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

import * as actions from '../../redux/actions/index';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token);
    }

    render() {
        let orders = this.props.orders.map((order) => {
            return <Order ingredients={order.ingredients} price={order.price} key={order.id} />;
        });

        if (this.props.loading) {
            orders = <Spinner />;
        }

        return <div>{orders}</div>;
    }
}

const importReduxState = (state) => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.fetchOrdersLoading,
        token: state.authReducer.token,
    };
};

const exportReactProps = (dispatch) => {
    return {
        onFetchOrders: (token) => dispatch(actions.fetchOrdersDB(token)),
    };
};

export default connect(importReduxState, exportReactProps)(witherrorHandler(Orders, axios));
