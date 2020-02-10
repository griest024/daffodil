import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DaffAuthTestingModule } from '@daffodil/auth/testing';

import { DemoLoginViewComponent } from './login-view.component';

@Component({
  selector: 'demo-login-form-container',
  template: ''
})
class MockLoginContainer {}

describe('DemoLoginViewComponent', () => {
  let component: DemoLoginViewComponent;
  let fixture: ComponentFixture<DemoLoginViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
				RouterTestingModule,
        DaffAuthTestingModule
      ],
      declarations: [
        DemoLoginViewComponent,
        MockLoginContainer
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLoginViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
