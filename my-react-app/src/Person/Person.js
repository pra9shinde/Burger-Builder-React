import React from 'react';

import './Person.css';

const person = (props) => {
  return (
    <div className="Person">
      <p onClick={props.click}>
        I'm {props.name} & my age is {props.age}
      </p>
      {
        //children gets data passed between opening and closing tags of component
      }
      <p>{props.children}</p>
      <input onChange={props.changed} value={props.name} />
    </div>
  );
};

export default person;
