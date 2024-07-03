import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ FooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display current year in the footer', () => {
    const footerElement: HTMLElement = fixture.nativeElement;
    const currentYear = new Date().getFullYear();
    const yearElement = footerElement.querySelector('.footer-content p:first-child');

    expect(yearElement?.textContent).toContain(`© ${currentYear}`);
  });

  it('should contain a link to Kenan Masleša LinkedIn profile', () => {
    const footerElement: HTMLElement = fixture.nativeElement;
    const linkElement = footerElement.querySelector('.footer-content .link');

    expect(linkElement?.textContent).toContain('Kenan Masleša');
    expect(linkElement?.getAttribute('href')).toBe('https://www.linkedin.com/in/kenan-maslesa/');
    expect(linkElement?.getAttribute('target')).toBe('_blank');
    expect(linkElement?.getAttribute('rel')).toBe('noopener noreferrer');
  });
});
