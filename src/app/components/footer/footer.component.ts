import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer">
      <div class="footer-content">
        <p>&copy; {{ currentYear }} All rights reserved.</p>
        <p>
          Developed by
          <a
            href="https://www.linkedin.com/in/kenan-maslesa/"
            target="_blank"
            rel="noopener noreferrer"
            class="link"
          >
            Kenan Masleša
          </a>
        </p>
      </div>
    </footer>
  `,
  styles: [
    `
      .footer {
        text-align: center;
        position: fixed;
        bottom: 0;
        right: 0;
        left: 0;
        background-color: transparent;
        color: white;
        padding: 10px;
        display: none;
      }
      .footer-content {
        display: block;
      }
      .footer-content p {
        margin: 5px;
      }
      .link {
        color: white;
        text-decoration: underline;
      }
      @media (min-width: 768px) {
        .footer {
          display: block;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  public currentYear = new Date().getFullYear();
}
