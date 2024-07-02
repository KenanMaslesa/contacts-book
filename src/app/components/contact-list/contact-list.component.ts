import { Component, OnInit, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Contact } from '../../models';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import {
  selectAllContacts,
  selectCurrentContact,
} from '../../state/contact.selectors';
import * as ContactActions from '../../state/contact.actions';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule, ContactFormComponent],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
})
export class ContactListComponent {
  private store = inject(Store);
  public contacts$: Observable<Contact[]> =
    this.store.select(selectAllContacts);
  public selectedContact$: Observable<Contact | undefined> =
    this.store.select(selectCurrentContact);

  public selectContact(contact: Contact): void {
    this.store.dispatch(
      ContactActions.SelectContact({ contactId: contact.id })
    );
  }
}
