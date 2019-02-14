import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingToStartComponent } from './waiting-to-start.component';

describe('WaitingToStartComponent', () => {
  let component: WaitingToStartComponent;
  let fixture: ComponentFixture<WaitingToStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitingToStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitingToStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
