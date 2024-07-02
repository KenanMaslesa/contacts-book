import { Store } from '@ngrx/store';
import { Injectable, inject } from '@angular/core';

import { Observable } from 'rxjs';
import * as ContactSelectors from './contact.selectors';
import { Contact } from '../models';
import * as ContactActions from './contact.actions';

/*  
 Benefits of Using Facade Pattern:

• Encapsulation: Facade provides a simplified interface to interact with complex subsystems (like NgRx store) by hiding implementation details. This simplifies usage and improves maintainability.
• Single Responsibility: Facade separates concerns, keeping components focused on presentation logic while delegating state management to the facade.
• Consistency: Facade promotes a consistent approach to accessing and updating state, reducing potential errors and ensuring adherence to best practices.
*/
@Injectable({ providedIn: 'root' })
export class ContactFacade {
  public store = inject(Store);
  public contacts$: Observable<Contact[]> = this.store.select(
    ContactSelectors.selectAllContacts
  );
  public selectedContact$: Observable<Contact | undefined> = this.store.select(
    ContactSelectors.selectCurrentContact
  );

  public dispatchAddContact(contact: Contact): void {
    this.store.dispatch(ContactActions.AddContact({ contact }));
  }

  public dispatchSelectContact(contactId: number): void {
    this.store.dispatch(ContactActions.SelectContact({ contactId }));
  }
}
