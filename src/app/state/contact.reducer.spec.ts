import { contactReducer, initialState } from './contact.reducer';
import * as ContactActions from './contact.actions';
import { Contact } from '../models';

describe('Contact Reducer', () => {
  it('should add a contact on AddContact action', () => {
    const contact: Contact = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      address: '123 Main St'
    };
    const action = ContactActions.AddContact({ contact });
    const state = contactReducer(initialState, action);

    expect(state.contacts).toContain(contact);
  });

  it('should select a contact on SelectContact action', () => {
    const contactId = 1;
    const action = ContactActions.SelectContact({ contactId });
    const state = contactReducer(initialState, action);

    expect(state.selectedContactId).toBe(contactId);
  });
});
