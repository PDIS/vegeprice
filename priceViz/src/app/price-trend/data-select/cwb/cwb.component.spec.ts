/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CwbComponent } from './cwb.component';

describe('CwbComponent', () => {
  let component: CwbComponent;
  let fixture: ComponentFixture<CwbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CwbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CwbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
