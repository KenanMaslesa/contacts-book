import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContactListComponent, FooterComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
