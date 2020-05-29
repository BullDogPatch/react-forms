import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import "./styles.css";

const initialFriends = [
  { id: uuid(), fname: "John", lname: "Smith" },
  { id: uuid(), fname: "Jane", lname: "Doe" }
];

function App() {
  // App is top level component
  // so t's an excellent place to put
  // all of our slices of state
  const [friends, setFriends] = useState(initialFriends);
  const [formValues, setFormValues] = useState({
    fname: "",
    lname: ""
  });

  const onInputChange = event => {
    // use event object to fish out
    // the current value and replace the WHOLE formValues
    // with a new one that's a copy of the old one
    const inputThatChanged = event.target.name;
    const newValueInput = event.target.value;
    setFormValues({
      ...formValues,
      [inputThatChanged]: newValueInput
    });
    console.log(formValues);
  };

  const onFormSubmit = event => {
    event.preventDefault();
    // add a new friend into the friends array in state
    const newFriend = {
      id: uuid(),
      fname: formValues.fname,
      lname: formValues.lname
    };
    setFriends([...friends, newFriend]);
  };

  return (
    <div className="App">
      <Form
        onInputChange={onInputChange}
        formValues={formValues}
        onFormSubmit={onFormSubmit}
      />
      <h3>List of friends:</h3>
      {friends.map(fr => (
        <div key={fr.id}>
          {fr.fname} {fr.lname}
        </div>
      ))}
    </div>
  );
}

function Form(props) {
  return (
    <form onSubmit={props.onFormSubmit}>
      <label>
        first name
        <input
          value={props.formValues.fname}
          name="fname"
          type="text"
          onChange={props.onInputChange} // callback takes event object
        />
      </label>
      <br />
      <label>
        last name
        <input
          value={props.formValues.lname}
          name="lname"
          type="text"
          onChange={props.onInputChange} // callback takes event object
        />
      </label>

      <input type="submit" />
    </form>
  );
}

export default App;
