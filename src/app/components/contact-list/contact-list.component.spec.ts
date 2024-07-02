import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { ContactListComponent } from './contact-list.component';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactFormComponent } from '../contact-form/contact-form.component';

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let dialogRef: jasmine.SpyObj<MatDialogRef<ContactFormComponent>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactListComponent],
      providers: [
        provideMockStore({}),
        { provide: MatDialogRef, useValue: dialogRef },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
