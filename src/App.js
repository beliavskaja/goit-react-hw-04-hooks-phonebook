import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Phonebook from "../src/components/phonebook/Phonebook";
import Contacts from "../src/components/contacts/Contacts";
import Filter from "./components/Filter/Filter";

const mocksContacts = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

export default function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    if (contacts.length) {
      setContacts(contacts);
    } else {
      setContacts(mocksContacts);
    }
  }, []);

  const onSubmit = ({ name, number }) => {
    const findContact = contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (findContact) {
      alert(`${name} is already in contacts!`);
    } else {
      const contact = { id: nanoid(), name, number };
      setContacts((state) => [contact, ...state]);
    }
  };

  const onDeleteContact = (id) => {
    setContacts((contacts) => 
      contacts.filter((contact) => contact.id !== id)
    );
  };

  const filterContacts = () => {
    return (contacts || []).filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const changeFilter = (event) => {
    setFilter(event.currentTarget.value);
  };

  return (
    <div>
      <Phonebook onSubmit={onSubmit} />
      <div>
        <h1 style={{ marginLeft: 80 }}>Contacts</h1>
        <Filter value={filter} onChangeFilter={changeFilter} />
        <Contacts
          contacts={filterContacts()}
          onDeleteContact={onDeleteContact}
        />
      </div>
    </div>
  );
}
