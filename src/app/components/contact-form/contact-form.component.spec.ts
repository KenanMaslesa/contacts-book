import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContactFormComponent } from './contact-form.component';
import { Contact } from '../../models';
import { ContactFacade } from '../../state/contact.facade';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let mockContactFacade: jasmine.SpyObj<ContactFacade>;
  let mockMatDialogRef: jasmine.SpyObj<MatDialogRef<ContactFormComponent>>;
  
  beforeEach(async () => {
    mockContactFacade = jasmine.createSpyObj('ContactFacade', ['dispatchAddContact']);
    mockMatDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent, BrowserAnimationsModule],
      providers: [
        provideMockStore({}),
        { provide: ContactFacade, useValue: mockContactFacade },
        { provide: MatDialogRef, useValue: mockMatDialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a new contact', () => {
    const newContact: Contact = {
      id: Date.now(),
      firstName: 'John',
      lastName: 'Doe',
      phone: '1234567890',
      email: 'john.doe@example.com',
      address: '123 Main St'
    };

    component.firstName = newContact.firstName;
    component.lastName = newContact.lastName;
    component.phone = newContact.phone;
    component.email = newContact.email;
    component.address = newContact.address;

    component.addNewContact();

    expect(mockContactFacade.dispatchAddContact).toHaveBeenCalledWith(newContact);
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });

  it('should close the dialog on cancel', () => {
    component.onCancel();
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });
});
