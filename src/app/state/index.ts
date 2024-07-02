import { ActionReducerMap } from "@ngrx/store";
import { contactReducer } from "./contact.reducer";

export interface State {}
export const reducers: ActionReducerMap<State> = {
  contact: contactReducer,
};
