import React, { Component } from "react";
import PropTypes from "prop-types";
import classes from "./Person.css";

import Aux from "../../../hoc/Auxilary";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
    constructor(props) {
        super(props);
        this.inputElRef = React.createRef();
    }

    componentDidMount() {
        // this.inputEl.focus(); //Focus last text box
        this.inputElRef.current.focus();
        console.log(this.context.authenticated);
    }

    static contextType = AuthContext; //Since context can only be access in render, we have this to save the context values gor further use

    render() {
        console.log("[Person.js] Rendering...");
        return (
            <Aux>
                <div className={classes.Person}>
                    {this.context.authenticated ? (
                        <p>Authenticated</p>
                    ) : (
                        <p>Not Authenticated</p>
                    )}

                    <p onClick={this.props.click}>
                        I'm {this.props.name} & my age is {this.props.age}
                    </p>
                    {
                        //children gets data passed between opening and closing tags of component
                    }
                    <p>{this.props.children}</p>
                    <input
                        onChange={this.props.changed}
                        value={this.props.name}
                        // ref={(inputEl) => {
                        //     this.inputEl = inputEl;
                        // }}
                        ref={this.inputElRef}
                    />
                </div>
            </Aux>
        );
    }
}

Person.protoTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
};

export default Person;
