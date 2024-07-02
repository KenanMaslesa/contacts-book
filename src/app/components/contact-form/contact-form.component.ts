import { Component, inject } from '@angular/core';
import * as ContactActions from '../../state/contact.actions';
import { Store } from '@ngrx/store';
import { Contact } from '../../models';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent {
  private store = inject(Store);
  public firstName: string = '';
  public lastName: string = '';
  public phone: string = '';
  public email: string = '';
  public address: string = '';

  public addNewContact(): void {
    const newContact: Contact = {
      id: Date.now(),
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      address: this.address,
    };

    this.store.dispatch(
      ContactActions.AddContact({
        contact: newContact,
      })
    );
  }
}
