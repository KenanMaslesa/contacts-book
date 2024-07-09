import { Action, createReducer, on } from '@ngrx/store';
import { ContactState } from '../models';
import * as ContactActions from './contact.actions';

export const initialState: ContactState = {
  contacts: [
    {
      id: 1,
      firstName: 'Kenan',
      lastName: 'Masleša',
      phone: '+38760010101',
      address: 'Jablanica',
      email: 'kenanmaslesaoffifical@gmail.com',
    },
    {
      id: 2,
      firstName: 'Merima',
      lastName: 'Šabanović',
      phone: '+38760010101',
      address: 'Jablanica',
      email: 'merimaa@gmail.com',
    },
  ],
  selectedContactId: null,
};

const _contactReducer = createReducer(
  initialState,
  on(ContactActions.AddContact, (state, { contact }) => ({
    ...state,
    contacts: [...state.contacts, contact],
  })),
  on(ContactActions.SelectContact, (state, { contactId }) => ({
    ...state,
    selectedContactId: state.selectedContactId === contactId ? null : contactId,
  }))
);

export function contactReducer(state: ContactState, action: Action) {
  return _contactReducer(state, action);
}
