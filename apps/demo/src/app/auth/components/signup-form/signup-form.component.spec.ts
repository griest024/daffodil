import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  DaffButtonModule,
  DaffInputModule
} from '@daffodil/design';
import { DaffAuthTestingModule } from '@daffodil/auth/testing';

import { DemoSignupFormComponent } from './signup-form.component';

describe('DemoSignupFormComponent', () => {
  let component: DemoSignupFormComponent;
  let fixture: ComponentFixture<DemoSignupFormComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
