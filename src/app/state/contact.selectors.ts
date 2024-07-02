import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ContactState } from './contact.reducer';

export const selectContactState = createFeatureSelector<ContactState>('contact');

export const selectAllContacts = createSelector(
  selectContactState,
  (state: ContactState) => state.contacts
);

export const selectCurrentContact = createSelector(
  selectContactState,
  (state: ContactState) => state.contacts.find(contact => contact.id === state.selectedContactId)
);