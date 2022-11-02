import React, { Component } from 'react';
import Notiflix from 'notiflix';
import PhonebookForm from './PhonebookForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { Container, Title } from './App.styled';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount = () => {
    const contacts = JSON.parse(localStorage.getItem('contacts'));

    if (contacts) {
      this.setState({ contacts: contacts });
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  };

  handleChange = event => {
    const { value } = event.currentTarget;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  contactsNameCheck = name => {
    const normalizedName = name.toLowerCase();
    return this.state.contacts.find(contact =>
      contact.name.toLowerCase().includes(normalizedName)
    );
  };

  formSubmitHandler = data => {
    this.contactsNameCheck(data.name)
      ? Notiflix.Notify.failure(`${data.name} is already in contacts.`)
      : this.setState(prevState => {
          return {
            contacts: [...prevState.contacts, data],
          };
        });
  };

  deleteContact = id => {
    const { contacts } = this.state;
    this.setState({ contacts: contacts.filter(contact => contact.id !== id) });
  };

  render() {
    const { filter, contacts } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container
        style={{
          position: 'relative',
          height: '100vh',
          width: 500,
          left: 300,
          marginTop: 50,
          justifyContent: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <Title>Phonebook</Title>
        <PhonebookForm onSubmit={this.formSubmitHandler}></PhonebookForm>

        <Title>Contacts</Title>
        <Filter filter={filter} onChange={this.handleChange}></Filter>
        {contacts.length > 0 && (
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          ></ContactList>
        )}
      </Container>
    );
  }
}

export { App };
