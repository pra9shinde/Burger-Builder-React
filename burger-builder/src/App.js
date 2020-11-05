import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

// Redux
import reducer from './redux/reducer';

// Components
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

const store = createStore(reducer); //Wrap Redux to React

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/orders' component={Orders} />
                        <Route path='/' exact component={BurgerBuilder} />
                        {/* 
                        <BurgerBuilder />
                        <Checkout /> 
                    */}
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
