import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Route path="/checkout" component={Checkout} />
                    <Route path="/orders" component={Orders} />
                    <Route path="/" exact component={BurgerBuilder} />
                    {/* 
                        <BurgerBuilder />
                        <Checkout /> 
                    */}
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
