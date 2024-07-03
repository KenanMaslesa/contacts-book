import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ContactListComponent } from './contact-list.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../../models';
import { ContactFacade } from '../../state/contact.facade';
import { of } from 'rxjs';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let contactFacade: ContactFacade;

  // Mock data
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

  // Mock MatDialogRef
  const mockDialogRef = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent],
      providers: [
        provideMockStore({}),
        { provide: MatDialogRef, useValue: mockDialogRef },
        {
          provide: ContactFacade,
          useValue: {
            contacts$: of(mockContacts),
            selectedContact$: of(undefined),
            dispatchSelectContact: () => {},
          },
        },
        { provide: MatDialog, useValue: { open: () => { } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    contactFacade = TestBed.inject(ContactFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with contacts from ContactFacade', () => {
    expect(component.contacts$).toBeDefined();
    component.contacts$.subscribe((contacts) => {
      expect(contacts).toEqual(mockContacts);
    });
  });

  it('should call dispatchSelectContact when toggleSelectedContact is called', () => {
    const contactToSelect = mockContacts[0];
    spyOn(contactFacade, 'dispatchSelectContact');
    component.toggleSelectedContact(contactToSelect);
    expect(contactFacade.dispatchSelectContact).toHaveBeenCalledWith(
      contactToSelect.id
    );
  });

  it('should unsubscribe from destroy$ on ngOnDestroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    component.ngOnDestroy();
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});
