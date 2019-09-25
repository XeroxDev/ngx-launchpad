import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxLaunchpadComponent } from './ngx-launchpad.component';

describe('NgxLaunchpadComponent', () => {
  let component: NgxLaunchpadComponent;
  let fixture: ComponentFixture<NgxLaunchpadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxLaunchpadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxLaunchpadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
