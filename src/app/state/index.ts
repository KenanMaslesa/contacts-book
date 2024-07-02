import { ActionReducerMap } from '@ngrx/store';
import { contactReducer } from './contact.reducer';

export const reducers: ActionReducerMap<{}> = {
  contact: contactReducer,
};
