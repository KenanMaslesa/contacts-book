export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

export interface ContactState {
  contacts: Contact[];
  selectedContactId: number | null;
}