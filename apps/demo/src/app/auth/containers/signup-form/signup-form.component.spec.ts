import { Component, Output, EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  DaffAuthFacadeService,
  DaffAccountRegistration,
  DaffCustomerRegistration,
  DaffAuthToken,
  DaffAuthRegister
} from '@daffodil/auth';
import {
  DaffAuthTestingModule,
  DaffAccountRegistrationFactory,
  DaffAuthTokenFactory
} from '@daffodil/auth/testing';

import { DemoSignupFormContainer } from './signup-form.component';
import { SignupInfo } from '../../models/signup-info';

@Component({
  template: '',
  selector: 'demo-signup-form'
})
class MockSignupFormComponent {
  @Output() submitForm = new EventEmitter<SignupInfo>();
}

describe('DemoSignupFormContainer', () => {
  let component: DemoSignupFormContainer;
  let fixture: ComponentFixture<DemoSignupFormContainer>;

  const registrationFactory = new DaffAccountRegistrationFactory();
  const authTokenFactory = new DaffAuthTokenFactory();

  const mockFacadeSpy = jasmine.createSpyObj('DaffAuthFacadeService', [
    'dispatch',
  ]);

  let mockRegistration: DaffAccountRegistration<DaffCustomerRegistration>;
  let mockAuthToken: DaffAuthToken;
  let mockSignupInfo: SignupInfo;

  let mockSignupFormComponent: MockSignupFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DemoSignupFormContainer,
        MockSignupFormComponent
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

    fixture = TestBed.createComponent(DemoSignupFormContainer);
    component = fixture.componentInstance;

    fixture.detectChanges();

    mockAuthToken = authTokenFactory.create();
    mockRegistration = registrationFactory.create();
    mockSignupInfo = {
      ...mockRegistration,
      confirmpassword: mockRegistration.password
    };

    mockSignupFormComponent = fixture.debugElement.query(By.css('demo-signup-form')).componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when submitForm is emitted', () => {
    const dispatchSpy = mockFacadeSpy.dispatch;
    const mockAction = new DaffAuthRegister(mockRegistration);

    it('should dispatch the DaffAuthRegister action type', () => {
      mockSignupFormComponent.submitForm.emit(mockSignupInfo);

      expect(dispatchSpy.calls.mostRecent().args[0].type).toEqual(mockAction.type);
    });

    it('should dispatch the action with the event payload', () => {
      mockSignupFormComponent.submitForm.emit(mockSignupInfo);

      expect(dispatchSpy.calls.mostRecent().args[0].registration).toEqual(jasmine.objectContaining(mockRegistration));
    });
  });
});
