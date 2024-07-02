import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { Contact } from '../../models';

import {
  selectAllContacts,
  selectCurrentContact,
} from '../../state/contact.selectors';
import * as ContactActions from '../../state/contact.actions';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [
    CommonModule,
    ContactFormComponent,
    MatDialogModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTooltipModule,
  ],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private store = inject(Store);
  public dialog = inject(MatDialog);

  public displayedColumns: string[] = ['firstName', 'lastName'];
  public contacts$!: Observable<Contact[]>;
  public selectedContact$!: Observable<Contact | undefined>;
  public selectedContact: Contact | undefined;

  public ngOnInit(): void {
    this.contacts$ = this.store.select(selectAllContacts);
    this.selectedContact$ = this.store.select(selectCurrentContact);

    this.selectedContact$
      .pipe(
        map((data) => {
          this.selectedContact = data;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public toggleSelectedContact(contact: Contact): void {
    this.store.dispatch(
      ContactActions.SelectContact({ contactId: contact.id })
    );
  }

  public openAddContactModal(): void {
    this.dialog.open(ContactFormComponent, {
      width: '450px',
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
