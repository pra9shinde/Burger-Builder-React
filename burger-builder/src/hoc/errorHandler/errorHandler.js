import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxilary/Auxilary';

const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null,
        };

        componentDidMount() {
            // console.log('DidMount: ' + this.state.error);
            this.reqInterceptor = axios.interceptors.request.use((req) => {
                this.setState({ error: null });
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(
                (res) => {
                    return res;
                },
                (error) => {
                    // console.log(console.error);
                    this.setState({ error: error });
                }
            );
        }

        componentDidUpdate() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null });
        };

        render() {
            // console.log('Render: ' + this.state.error);
            return (
                <Aux>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    };
};

export default errorHandler;
