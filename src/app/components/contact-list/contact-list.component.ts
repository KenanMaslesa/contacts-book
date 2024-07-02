import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../../models';
import { Store } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { selectAllContacts } from '../../state/contact.selectors';

@Component({
  selector: 'app-contact-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.scss'
})
export class ContactListComponent implements OnInit {
  public contacts$!: Observable<Contact[]>;
  private store = inject(Store);

  ngOnInit() {
    this.contacts$ = this.store.select(selectAllContacts);
  }
}
