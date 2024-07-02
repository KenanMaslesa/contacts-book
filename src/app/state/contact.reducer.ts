import { Action, createReducer, on } from '@ngrx/store';
import { Contact } from '../models';

export interface ContactState {
  contacts: Contact[];
  selectedContactId: number | null;
}

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
);

export function contactReducer(state: ContactState, action: Action) {
  return _contactReducer(state, action);
}
