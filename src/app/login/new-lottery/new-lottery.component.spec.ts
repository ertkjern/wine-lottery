import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLotteryComponent } from './new-lottery.component';

describe('NewLotteryComponent', () => {
  let component: NewLotteryComponent;
  let fixture: ComponentFixture<NewLotteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLotteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
