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

@Component({
  template: '',
  selector: 'demo-signup-form'
})
class MockSignupFormComponent {
  @Output() submit = new EventEmitter<DaffAccountRegistration<DaffCustomerRegistration>>();
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

    mockSignupFormComponent = fixture.debugElement.query(By.css('demo-signup-form')).componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when submit is emitted', () => {
    const dispatchSpy = mockFacadeSpy.dispatch;
    const mockAction = new DaffAuthRegister(mockRegistration);

    it('should dispatch the DaffAuthRegister action type', () => {
      mockSignupFormComponent.submit.emit(mockRegistration);

      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({type: mockAction.type}));
    });

    it('should dispatch the action with the event payload', () => {
      mockSignupFormComponent.submit.emit(mockRegistration);

      expect(dispatchSpy).toHaveBeenCalledWith(jasmine.objectContaining({registration: mockRegistration}));
    });
  });
});
