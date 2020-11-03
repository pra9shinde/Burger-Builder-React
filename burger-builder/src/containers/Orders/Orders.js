import React, { Component } from "react";

import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import errorHandler from "../../hoc/errorHandler/errorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
    state = {
        orders: [],
        loading: true,
    };

    componentDidMount() {
        axios
            .get("/orders.json")
            .then((res) => {
                // convert object to arr
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key,
                    });
                }

                this.setState({
                    loading: false,
                    orders: fetchedOrders,
                });
            })
            .catch((e) => {
                this.setState({
                    loading: false,
                });
            });
    }

    render() {
        let orders = this.state.orders.map((order) => {
            return (
                <Order
                    ingredients={order.ingredients}
                    price={order.price}
                    key={order.id}
                />
            );
        });

        if (this.state.loading) {
            orders = <Spinner />;
        }

        return <div>{orders}</div>;
    }
}

export default errorHandler(Orders, axios);
