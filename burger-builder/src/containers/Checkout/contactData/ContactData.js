import React, { Component } from 'react';
import { withRouter } from 'react-router';
import axios from '../../../axios-orders';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Spinner from '../../../components/UI/Spinner/Spinner';

import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode',
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6,
                    maxLength: 6,
                },
                valid: false,
                touched: false,
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'City',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: 'email',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Email Address',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest',
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest',
                        },
                    ],
                },
                value: 'fastest',
                validation: {},
                valid: true,
                touched: false,
            },
        },
        formIsValid: false,
        loading: false,
    };

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({
            loading: true,
        });

        const formData = {};

        for (let formElIdentifier in this.state.orderForm) {
            formData[formElIdentifier] = this.state.orderForm[formElIdentifier].value;
        }

        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData: formData,
        };

        axios
            .post('/orders.json', order)
            .then((res) => {
                console.log(res);
                this.setState({
                    loading: false,
                });
                this.props.history.push('/');
            })
            .catch((e) => {
                console.log(e);
                this.setState({
                    loading: true,
                });
            });
    };

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = { ...this.state.orderForm };
        const updatedFormELement = { ...updatedForm[inputIdentifier] };
        updatedFormELement.value = event.target.value;
        updatedFormELement.valid = this.checkValidation(updatedFormELement.value, updatedFormELement.validation);
        updatedFormELement.touched = true;

        updatedForm[inputIdentifier] = updatedFormELement;

        let formIsValid = true;
        for (let input in updatedForm) {
            formIsValid = updatedForm[input].valid && formIsValid;
        }

        console.log(formIsValid);

        this.setState({
            orderForm: updatedForm,
            formIsValid: formIsValid,
        });
    };

    checkValidation = (value, rules) => {
        let isValid = true;

        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        return isValid;
    };

    render() {
        const formElArr = [];
        for (let key in this.state.orderForm) {
            formElArr.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {formElArr.map((element) => (
                    <Input
                        elementType={element.config.elementType}
                        elementConfig={element.config.elementConfig}
                        value={element.config.value}
                        key={element.id}
                        invalid={!element.config.valid}
                        shouldValidate={element.config.validation}
                        touched={element.config.touched}
                        changed={(event) => this.inputChangedHandler(event, element.id)}
                    />
                ))}

                <Button btnType='Success' disabled={!this.state.formIsValid}>
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
