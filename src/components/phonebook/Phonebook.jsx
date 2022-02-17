import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form, ContactInput, AddButton } from "./Phonebook.styled";

export default function Phonebook({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChange = (event) => {
    const phoneBookInput = event.currentTarget.name;
    if (phoneBookInput === "name") {
      setName(event.currentTarget.value);
    }
    if (phoneBookInput === "number") {
      setNumber(event.currentTarget.value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ name, number });
    reset();
  };

  const reset = () => {
    setName("");
    setNumber("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <ContactInput
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <ContactInput
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />
      <AddButton type="submit" value="Add Contact" />
    </Form>
  );
}

Phonebook.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
