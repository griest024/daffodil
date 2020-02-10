import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DaffAuthTestingModule } from '@daffodil/auth/testing';

import { DemoSignupViewComponent } from './signup-view.component';

@Component({
  selector: 'demo-signup-form-container',
  template: ''
})
class MockSignupContainer {}

describe('DemoSignupViewComponent', () => {
  let component: DemoSignupViewComponent;
  let fixture: ComponentFixture<DemoSignupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
				RouterTestingModule,
        DaffAuthTestingModule
      ],
      declarations: [
        DemoSignupViewComponent,
        MockSignupContainer
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoSignupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
