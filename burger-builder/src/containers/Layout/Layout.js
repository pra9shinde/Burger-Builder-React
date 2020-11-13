import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import classes from './Layout.css';

// Redux
import { connect } from 'react-redux';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false,
    };

    sideDrawerClosedHandler = () => {
        this.setState({ showSideDrawer: false });
    };

    sideDrawerOpenHandler = () => {
        this.setState({ showSideDrawer: true });
    };

    render() {
        return (
            <Aux>
                <Toolbar sidebarOpen={this.sideDrawerOpenHandler} isAuth={this.props.isAuthenticated} />
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler} isAuth={this.props.isAuthenticated} />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

const importReduxState = (state) => {
    return {
        isAuthenticated: state.authReducer.token !== null,
    };
};

export default connect(importReduxState)(Layout);
