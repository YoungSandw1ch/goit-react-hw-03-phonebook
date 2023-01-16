import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Box, Title } from './Common';
import { Container } from './Container';
import { ContactForm } from './ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';
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
    return (
      <Container>
        <Box
          mx="auto"
          width="half"
          border="medium"
          borderRadius="normal"
          px={4}
          py={5}
          borderColor="blue"
          boxShadow="phoneBook"
          backgroundColor="autumnOrange.cotton"
        >
          <Title mb={4} color="blue">
            Phonebook
          </Title>
          <ContactForm onSubmit={this.contactFormSubmit} />

          <Title as="h2" mb={4} color="blue" fontSize="ms">
            Contacts
          </Title>
          <Filter onFilter={this.setFilterState} value={this.state.filter} />
          <ContactList
            contacts={filteredContact}
            onContactDelete={this.deleteContact}
          />
        </Box>
      </Container>
    );
  }
}
