import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Title } from '../Common';
import { Wrapper } from './App.styled';
import { Container } from '../Container';
import { ContactForm } from '../ContactForm';
import { ContactList } from '../ContactList';
import { Filter } from '../Filter';
import { initialState } from 'constants';
import { report } from 'utils';

export class App extends Component {
  state = {
    contacts: initialState,
    filter: '',
  };

  contactFormSubmit = data => {
    const { name, number } = data;
    const id = nanoid();
    this.setState(prev => {
      const isContactExist = prev.contacts.reduce(
        (acc, c) =>
          c.name.toLowerCase() === name.toLowerCase() ? acc + 1 : acc,
        0
      );
      if (isContactExist) {
        report();
        return;
      }
      return {
        contacts: [...prev.contacts, { id, name, number }],
      };
    });
  };

  deleteContact = id =>
    this.setState(prev => ({
      contacts: prev.contacts.filter(el => el.id !== id),
    }));

  setFilterState = text => {
    this.setState(prev => ({
      ...prev,
      filter: text,
    }));
  };

  filterContacts = state => {
    const normalizedText = state.filter.toLowerCase();
    return state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedText)
    );
  };

  render() {
    const filteredContact = this.filterContacts(this.state);
    const { filter } = this.state;
    const { contactFormSubmit, setFilterState, deleteContact } = this;
    return (
      <Container>
        <Wrapper>
          <Title mb={4} color="blue">
            Phonebook
          </Title>
          <ContactForm onSubmit={contactFormSubmit} />

          <Title as="h2" mb={4} color="blue" fontSize="ms">
            Contacts
          </Title>
          <Filter onFilter={setFilterState} value={filter} />
          <ContactList
            contacts={filteredContact}
            onContactDelete={deleteContact}
          />
        </Wrapper>
      </Container>
    );
  }
}
