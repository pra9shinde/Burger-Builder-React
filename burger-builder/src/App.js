import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

// Redux
import burgerBuilderReducer from './redux/reducer/burgerBuilder';
import orderReducer from './redux/reducer/order';
import authReducer from './redux/reducer/auth';

// Components
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //advance devtools coz we use thunk & middleware for async code

// Combine Reducers
const rootReducer = combineReducers({
    burgerBuilderReducer: burgerBuilderReducer,
    orderReducer: orderReducer,
    authReducer: authReducer,
});

// Second arg is for redux dev
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk))); //Wrap Redux to React

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <Layout>
                        <Route path='/checkout' component={Checkout} />
                        <Route path='/orders' component={Orders} />
                        <Route path='/auth' component={Auth} />
                        <Route path='/logout' component={Logout} />
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
