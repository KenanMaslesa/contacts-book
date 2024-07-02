import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { Contact } from '../../models';
import { ContactFacade } from '../../state/contact.facade';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatSelectModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private contactFacade = inject(ContactFacade);
  private dialogRef = inject(MatDialogRef<ContactFormComponent>);

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

    this.contactFacade.dispatchAddContact(newContact);
    this.dialogRef.close();
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
