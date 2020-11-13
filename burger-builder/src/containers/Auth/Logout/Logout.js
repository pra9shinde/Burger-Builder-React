import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../redux/actions/index';

class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to='/' />;
    }
}

const exportReactState = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(null, exportReactState)(Logout);
