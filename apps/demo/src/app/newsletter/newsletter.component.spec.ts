import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterComponent } from './newsletter.component';
import { DaffContainerModule } from '@daffodil/design';

import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { DaffContainerModule } from '@daffodil/design';
import { DaffNewsletterTestingModule, MockDaffNewsletterFacade } from '@daffodil/newsletter/testing';


import { NewsletterComponent } from './newsletter.component';

describe('NewsletterComponent', () => {
  let component: NewsletterComponent;
  let fixture: ComponentFixture<NewsletterComponent>;
  let facade: MockDaffNewsletterFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NewsletterComponent
      ],
      imports: [
        DaffContainerModule,
        ReactiveFormsModule,
        DaffNewsletterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsletterComponent);
    component = fixture.componentInstance;
    facade = TestBed.inject(MockDaffNewsletterFacade);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('on <daff-container>', () => {
    it('should set size="md"', () => {
      const container = fixture.debugElement.query(By.css('daff-container'));

      expect(container.componentInstance.size).toEqual('md');
    });
  });
  describe('when intialized', () => {
    let newsletterElement;

    beforeEach(() => {
      facade.loading$.next(false);
      facade.success$.next(false);
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.demo-newsletter__right');
    });
    it('should render class .demo-newsletter__right', () => {
      expect(newsletterElement).not.toBeNull();
    });
    it('should call onNewsletterSubmit on click', () => {
      spyOn(component, 'onNewsletterSubmit');

      newsletterElement = fixture.debugElement.nativeElement.querySelector('button');
      newsletterElement.click();
      expect(component.onNewsletterSubmit).toHaveBeenCalled();
    });
  });
  describe('when loading$ is true', () => {
    let newsletterElement;

    beforeEach(() => {
      facade.loading$.next(true);
      facade.success$.next(false);
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.demo-newsletter__loading');
    });
    it('should render .demo-newsletter__loading', () => {
      expect(newsletterElement).not.toBeNull();
    });
    it('should call onNewsletterCancel on click', () => {
      spyOn(component, 'onNewsletterCancel');

      newsletterElement = fixture.debugElement.nativeElement.querySelector('button');
      newsletterElement.click();
      expect(component.onNewsletterCancel).toHaveBeenCalled();
    });
  })
  describe('when success$ is true', () => {
    let newsletterElement;

    beforeEach(() => {
      facade.loading$.next(false);
      facade.success$.next(true);
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.demo-newsletter__success');
    });
    it('should render .demo-newsletter__success', () => {
      expect(newsletterElement).not.toBeNull();
    });
  });
  describe('when an error is thrown', () => {
    let newsletterElement;

    beforeEach(() => {
      facade.loading$.next(false);
      facade.success$.next(false);
      facade.error$.next('Error');
      fixture.detectChanges();

      newsletterElement = fixture.debugElement.nativeElement.querySelector('.demo-newsletter__retry');
    });
    it('should render .demo-newsletter__retry', () => {
      expect(newsletterElement).not.toBeNull();
    });
    it('should call onNewsletterRetry on click', () => {
      spyOn(component, 'onNewsletterRetry');

      newsletterElement = fixture.debugElement.nativeElement.querySelector('button');
      newsletterElement.click();
      expect(component.onNewsletterRetry).toHaveBeenCalled();
    });
  });
});
