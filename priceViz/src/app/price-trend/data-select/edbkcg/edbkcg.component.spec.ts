/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EdbkcgComponent } from './edbkcg.component';

describe('EdbkcgComponent', () => {
  let component: EdbkcgComponent;
  let fixture: ComponentFixture<EdbkcgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdbkcgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdbkcgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
