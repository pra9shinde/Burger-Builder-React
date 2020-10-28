import React, { Component } from "react";
import classes from "./App.css";

import Cockpit from "../components/Cockpit/Cockpit";
import Persons from "../components/Persons/Persons";
import AuthContext from "../context/auth-context";

class App extends Component {
    constructor(props) {
        super(props);
        console.log("[App.js] Constructor");
    }

    // React method called before render
    static getDerivedStateFromProps(props, state) {
        console.log("[App.js] getDerivedStateFromProps", props);
        return state;
    }

    // Removed from latest React
    /*componentWillMount() {
        console.log("[App.js] componentWillMount");
    }*/

    // When component is added to DOM by react
    componentDidMount() {
        console.log("[App.js] componentDidMount");
    }

    /*------------- Update Component React Methods --------*/
    // whether to update the component on re-render
    shouldComponentUpdate() {
        console.log("[App.js] shouldComponentUpdate");
        return true;
    }

    // Fires when component is updated
    componentDidUpdate() {
        console.log("[App.js] componentDidUpdate");
    }
    /*------------- Update Component React Methods --------*/

    state = {
        persons: [
            { id: 1, name: "Max", age: 25 },
            { id: 2, name: "John", age: 28 },
            { id: 3, name: "Jack", age: 30 },
        ],
        showPersons: false,
        authenticated: false,
    };

    nameChangedHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex((person) => {
            return person.id === id;
        });

        const person = { ...this.state.persons[personIndex] };

        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;

        this.setState({
            persons: persons,
        });
    };

    deletePersonHandler = (personIndex) => {
        const persons = [...this.state.persons];
        // Delete from array
        persons.splice(personIndex, 1);
        this.setState({ persons: persons }); //update State
    };

    togglePersonsHandler = () => {
        const doesShow = this.state.showPersons;

        this.setState({
            showPersons: !doesShow,
        });
    };

    loginHandler = () => {
        this.setState({
            authenticated: true,
        });
    };

    render() {
        console.log("[App.js] Render");

        let persons = null;

        if (this.state.showPersons) {
            persons = (
                <div>
                    <Persons
                        persons={this.state.persons}
                        clicked={this.deletePersonHandler}
                        changed={this.nameChangedHandler}
                    />
                </div>
            );
        }

        return (
            // Auth Context is wrapped to access the variables set inside it. Its like a session, all components can access that varibale directly
            <AuthContext.Provider
                value={{
                    authenticated: this.state.authenticated,
                    login: this.loginHandler,
                }}
            >
                <div className={classes.App}>
                    <Cockpit
                        title={this.props.title}
                        showPersons={this.state.showPersons}
                        personsLength={this.state.persons.length}
                        clicked={this.togglePersonsHandler}
                        loginHandler={this.loginHandler}
                    />
                    {persons}
                </div>
            </AuthContext.Provider>
        );
    }
}

export default App;
