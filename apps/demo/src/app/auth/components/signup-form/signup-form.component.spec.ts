import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  DaffButtonModule,
  DaffInputModule
} from '@daffodil/design';
import {
  DaffAccountRegistration,
  DaffCustomerRegistration
} from '@daffodil/auth';
import {
  DaffAuthTestingModule,
  DaffAccountRegistrationFactory
} from '@daffodil/auth/testing';

import { DemoSignupFormComponent } from './signup-form.component';

describe('DemoSignupFormComponent', () => {
  let component: DemoSignupFormComponent;
  let fixture: ComponentFixture<DemoSignupFormComponent>;

  const accountRegistrationFactory = new DaffAccountRegistrationFactory();

  let mockAccountRegistration: DaffAccountRegistration<DaffCustomerRegistration>;
  let mockFormData;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        DaffButtonModule,
        DaffInputModule,
        DaffAuthTestingModule
      ],
      declarations: [
        DemoSignupFormComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSignupFormComponent);
    component = fixture.componentInstance;

    mockAccountRegistration = accountRegistrationFactory.create();
    mockFormData = {
      email: mockAccountRegistration.customer.email,
      firstName: mockAccountRegistration.customer.firstName,
      lastName: mockAccountRegistration.customer.lastName,
      password: mockAccountRegistration.password,
      confirmPassword: mockAccountRegistration.password
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the form is submitted', () => {
    let submitEventSpy;

    beforeEach(() => {
      submitEventSpy = spyOn(component.submit, 'emit');
    });

    describe('and the passwords match', () => {
      it('should emit the submit event', () => {
        component.onSubmit(mockFormData);

        expect(submitEventSpy).toHaveBeenCalledWith(mockAccountRegistration);
      });
    });

    describe('and the passwords do not match', () => {
      beforeEach(() => {
        mockFormData.confirmPassword = `${mockFormData.password}asdfniosidon`
      });

      it('should not emit the submit event', () => {
        component.onSubmit(mockFormData);

        expect(submitEventSpy).not.toHaveBeenCalled();
      });
    });
  });
});
