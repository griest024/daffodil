import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { DaffLoginInfo } from '@daffodil/auth';


/**
 * A login form component.
 */
@Component({
  selector: 'demo-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class DemoLoginFormComponent implements OnInit {
  @Output() submit: EventEmitter<DaffLoginInfo> = new EventEmitter<DaffLoginInfo>();

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }

  onSubmit(data) {
    this.submit.emit(data)
  }
}
