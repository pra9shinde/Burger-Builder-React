import React, { Component } from 'react';
import Radium from 'radium';
import './App.css';

import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { id: 1, name: 'Max', age: 25 },
      { id: 2, name: 'John', age: 28 },
      { id: 3, name: 'Jack', age: 30 },
    ],
    showPersons: false,
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

  render() {
    const style = {
      backgroundColor: 'green',
      font: 'inherit',
      border: '1px solid #eee',
      padding: '10px',
      cursor: 'pointer',
      color: '#fff',
      borderRadius: '10px',
      outline: 0,
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black',
      },
    };

    let persons = null;

    if (this.state.showPersons) {
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black',
      };

      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                name={person.name}
                age={person.age}
                click={this.deletePersonHandler.bind(index)}
                key={person.id}
                changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            );
          })}
        </div>
      );
    }

    let classes = [];
    if (this.state.persons.length <= 2) {
      classes.push('red');
    }

    if (this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <div className="App">
        <h1>My React App</h1>
        <p className={classes.join(' ')}>This is a new React Application</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Toggle Persons
        </button>

        {persons}
      </div>
    );
  }
}

export default Radium(App);
