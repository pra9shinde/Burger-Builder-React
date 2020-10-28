import React, { PureComponent } from "react";
import Person from "../Persons/Person/Person";

class Persons extends PureComponent {
    // React method executed before render (new/update)
    // static getDerivedStateFromProps(props, state) {
    //     console.log("[Persons.js] getDerivedStateFromProps");
    //     return state;
    // }

    // Whether the component should be re-rendered. returns true or false
    //You can also extend PureCompontnt to main class which handles this change check
    /*
    shouldComponentUpdate(nextProps, nextState) {
        console.log("[Persons.js] shouldComponentUpdate");
        //render only if persons prop is changed
        if (
            nextProps.persons !== this.props.persons ||
            nextProps.click !== this.props.click ||
            nextProps.changed !== this.props.changed
        ) {
            return true;
        } else {
            return false;
        }
    }
    */

    // Returns the props,state which was before updating
    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log("[Persons.js] getSnapshotBeforeUpdate");
        return { message: "snapshot" };
    }

    // When component is updated
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("[Persons.js] componentDidUpdate");
        console.log(snapshot);
    }

    // When component is removed from DOM
    componentWillUnmount() {
        console.log("[Persons.js] componentWillUnmount");
    }

    render() {
        console.log("[Persons.js] Rendering...");
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    name={person.name}
                    age={person.age}
                    click={this.props.clicked.bind(index)}
                    changed={(event) => this.props.changed(event, person.id)}
                    key={person.id}
                />
            );
        });
    }
}

export default Persons;
