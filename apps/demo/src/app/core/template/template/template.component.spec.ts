import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TemplateComponent } from './template.component';

@Component({selector: 'demo-header-container', template: ''})
class MockHeaderViewComponent {}

@Component({selector: 'demo-sidebar-viewport-container', template: ''})
class MockSidebarViewComponent {}

@Component({selector: 'demo-footer', template: ''})
class MockFooterComponent {}


describe('TemplateComponent', () => {
  let component: TemplateComponent;
  let fixture: ComponentFixture<TemplateComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TemplateComponent
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
