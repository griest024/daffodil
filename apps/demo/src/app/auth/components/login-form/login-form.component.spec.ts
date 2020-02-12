import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import {
  DaffFormFieldModule,
  DaffButtonModule,
  DaffLoadingIconModule,
  DaffInputModule
} from '@daffodil/design';
import { DaffAuthTestingModule } from '@daffodil/auth/testing';

import { DemoLoginFormComponent } from './login-form.component';

describe('DemoLoginFormComponent', () => {
  let component: DemoLoginFormComponent;
  let fixture: ComponentFixture<DemoLoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,

        DaffInputModule,
        DaffButtonModule,
        DaffAuthTestingModule
      ],
      declarations: [
        DemoLoginFormComponent
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoLoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
