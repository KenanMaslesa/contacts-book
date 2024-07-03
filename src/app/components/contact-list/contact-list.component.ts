import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Observable, Subject, map, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { Contact } from '../../models';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { ContactFacade } from '../../state/contact.facade';

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
  private contactFacade = inject(ContactFacade);
  private dialog = inject(MatDialog);

  public displayedColumns: string[] = ['firstName', 'lastName'];
  public contacts$!: Observable<Contact[]>;
  public selectedContact: Contact | undefined;

  public ngOnInit(): void {
    this.contacts$ = this.contactFacade.contacts$;

    this.contactFacade.selectedContact$
      .pipe(
        map((selectedContact) => {
          this.selectedContact = selectedContact;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public toggleSelectedContact(contact: Contact): void {
    this.contactFacade.dispatchSelectContact(contact.id);
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
