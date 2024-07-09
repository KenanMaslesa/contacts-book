import { TestBed } from '@angular/core/testing';
import { ContactFacade } from './contact.facade';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Contact } from '../models';
import * as ContactActions from './contact.actions';
import * as ContactSelectors from './contact.selectors';

describe('ContactFacade', () => {
  let facade: ContactFacade;
  let store: MockStore;
  const mockContacts: Contact[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      address: '123 Main St',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      phone: '9876543210',
      email: 'jane.smith@example.com',
      address: '456 Elm St',
    },
  ];
  const initialState = { contacts: mockContacts };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactFacade, provideMockStore({ initialState })],
    });

    facade = TestBed.inject(ContactFacade);
    store = TestBed.inject(MockStore);

    store.overrideSelector(ContactSelectors.selectAllContacts, mockContacts);
    store.overrideSelector(ContactSelectors.selectCurrentContact, mockContacts[0]);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('contacts$ should select all contacts from the store', (done) => {
    facade.contacts$.subscribe((contacts) => {
      expect(contacts).toEqual(mockContacts);
      done();
    });
  });

  it('selectedContact$ should select the current contact from the store', (done) => {
    facade.selectedContact$.subscribe((contact) => {
      expect(contact).toEqual(mockContacts[0]);
      done();
    });
  });

  it('dispatchAddContact should dispatch AddContact action', () => {
    const contact: Contact = {
      id: 3,
      firstName: 'New',
      lastName: 'Contact',
      phone: '5555555555',
      email: 'new.contact@example.com',
      address: '789 Pine St',
    };
    const spy = spyOn(store, 'dispatch');

    facade.dispatchAddContact(contact);

    expect(spy).toHaveBeenCalledWith(ContactActions.AddContact({ contact }));
  });

  it('dispatchSelectContact should dispatch SelectContact action', () => {
    const contactId = 1;
    const spy = spyOn(store, 'dispatch');

    facade.dispatchSelectContact(contactId);

    expect(spy).toHaveBeenCalledWith(ContactActions.SelectContact({ contactId }));
  });
});
