import React, { Component } from "react";
import { withRouter } from "react-router";
import axios from "../../../axios-orders";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";

import classes from "./ContactData.css";

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            postalCode: "",
        },
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: "Pranav",
                address: {
                    street: "Street 1",
                    zipCode: "123456",
                    city: "Mumbai",
                },
                email: "test@test.com",
            },
            deliveryMethod: "fastest",
        };

        axios
            .post("/orders.json", order)
            .then((res) => {
                console.log(res);
                this.setState({
                    loading: false,
                });
                this.props.history.push("/");
            })
            .catch((e) => {
                console.log(e);
                this.setState({
                    loading: true,
                });
            });
    };

    render() {
        let form = (
            <form>
                <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className={classes.Input}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className={classes.Input}
                />
                <input
                    type="text"
                    name="street"
                    placeholder="Enter your street"
                    className={classes.Input}
                />
                <input
                    type="text"
                    name="postalCode"
                    placeholder="Enter your postalCode"
                    className={classes.Input}
                />
                <Button
                    btnType="Success"
                    className={classes.Input}
                    clicked={this.orderHandler}
                >
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your details!</h4>
                {form}
            </div>
        );
    }
}

export default withRouter(ContactData);
