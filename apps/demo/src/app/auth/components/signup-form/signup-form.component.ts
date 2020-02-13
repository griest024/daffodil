import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { DaffAccountRegistration, DaffCustomerRegistration } from '@daffodil/auth';

@Component({
  selector: 'demo-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss']
})
export class DemoSignupFormComponent implements OnInit {
  @Output() submit = new EventEmitter<DaffAccountRegistration<DaffCustomerRegistration>>();

  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  onSubmit({
    email,
    firstName,
    lastName,
    password,
    confirmPassword
  }) {
    if (password === confirmPassword) {
      this.submit.emit({
        customer: {
          email,
          firstName,
          lastName
        },
        password
      })
    }
  }
}
