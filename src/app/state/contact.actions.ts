import { createAction, props } from '@ngrx/store';
import { Contact } from '../models';

export const AddContact = createAction(
  '[Contact] Add Contact',
  props<{ contact: Contact }>()
);

export const SelectContact = createAction(
  '[Contact] Select Contact',
  props<{ contactId: number }>()
);
