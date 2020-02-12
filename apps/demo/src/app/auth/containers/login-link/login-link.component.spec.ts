import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoLoginLinkComponent } from './login-link.component';
import { DaffAuthFacadeService, DaffAuthToken } from '@daffodil/auth';
import { DaffAuthTestingModule, DaffAuthTokenFactory } from '@daffodil/auth/testing';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('DemoLoginLinkComponent', () => {
  let component: DemoLoginLinkComponent;
  let fixture: ComponentFixture<DemoLoginLinkComponent>;
  let facade;

  let logoutElement: DebugElement;
  let loginElement: DebugElement;

  const authTokenFactory = new DaffAuthTokenFactory();

  let mockAuthToken: DaffAuthToken;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoLoginLinkComponent
      ],
      imports: [
        DaffAuthTestingModule,
      ],
    })
    .compileComponents();

    facade = TestBed.get(DaffAuthFacadeService);
    fixture = TestBed.createComponent(DemoLoginLinkComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();

    mockAuthToken = authTokenFactory.create();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when user is authenticated', () => {
    beforeEach(() => {
      facade.token$ = new BehaviorSubject(mockAuthToken.token);

      fixture.detectChanges();

      logoutElement = fixture.debugElement.query(By.css('.login-link__logout'));
      loginElement = fixture.debugElement.query(By.css('.login-link__login-signup'));
    });

    it('should render .login-link__logout', () => {
      expect(logoutElement).not.toBeNull();
    });

    it('should not render .login-link__login-signup', () => {
      expect(loginElement).toBeNull();
    });
  });

  describe('when user is unauthenticated', () => {
    beforeEach(() => {
      facade.token$ = new BehaviorSubject(null);

      fixture.detectChanges();

      logoutElement = fixture.debugElement.query(By.css('.login-link__logout'));
      loginElement = fixture.debugElement.query(By.css('.login-link__login-signup'));
    });

    it('should not render .login-link__logout', () => {
      expect(logoutElement).toBeNull();
    });

    it('should render .login-link__login-signup', () => {
      expect(loginElement).not.toBeNull();
    });
  });
});
