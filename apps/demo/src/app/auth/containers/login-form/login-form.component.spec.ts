import { Component, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  DaffAuthFacadeService,
  DaffAccountRegistration,
  DaffCustomerRegistration,
  DaffLoginInfo,
  DaffAuthToken
} from '@daffodil/auth';
import {
  DaffAuthTestingModule,
  DaffAccountRegistrationFactory,
  DaffAuthTokenFactory
} from '@daffodil/auth/testing';

import { DemoLoginFormContainer } from './login-form.component';
import { DaffAuthLogin } from 'libs/auth/src';

@Component({
  template: '',
  selector: 'demo-login-form'
})
class MockLoginFormComponent {
  @Output() submit = new EventEmitter<DaffLoginInfo>();
}

describe('DemoLoginFormContainer', () => {
  let component: DemoLoginFormContainer;
  let fixture: ComponentFixture<DemoLoginFormContainer>;

  const registrationFactory = new DaffAccountRegistrationFactory();
  const authTokenFactory = new DaffAuthTokenFactory();

  const mockFacadeSpy = jasmine.createSpyObj('DaffAuthFacadeService', [
    'dispatch',
  ]);

  let mockRegistration: DaffAccountRegistration<DaffCustomerRegistration>;
  let mockLoginInfo: DaffLoginInfo;
  let mockAuthToken: DaffAuthToken;

  let mockLoginFormComponent: MockLoginFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoLoginFormContainer,
        MockLoginFormComponent
      ],
      imports: [
        DaffAuthTestingModule,
      ],
      providers: [
        {
          provide: DaffAuthFacadeService,
          useValue: mockFacadeSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DemoLoginFormContainer);
    component = fixture.componentInstance;

    fixture.detectChanges();

    mockAuthToken = authTokenFactory.create();
    mockRegistration = registrationFactory.create();
    mockLoginInfo = {
      email: mockRegistration.customer.email,
      password: mockRegistration.password
    };

    mockLoginFormComponent = fixture.debugElement.query(By.css('demo-login-form')).componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when submit is emitted', () => {
    const dispatchSpy = mockFacadeSpy.dispatch;
    const mockAction = new DaffAuthLogin(mockLoginInfo);

    it('should dispatch the DaffAuthLogin action type', () => {
      mockLoginFormComponent.submit.emit(mockLoginInfo);

      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({type: mockAction.type}));
    });

    it('should dispatch the action with the event payload', () => {
      mockLoginFormComponent.submit.emit(mockLoginInfo);

      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({loginInfo: mockLoginInfo}));
    });
  });
});
