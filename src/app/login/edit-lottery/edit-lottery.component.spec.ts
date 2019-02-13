import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLotteryComponent } from './edit-lottery.component';

describe('EditLotteryComponent', () => {
  let component: EditLotteryComponent;
  let fixture: ComponentFixture<EditLotteryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLotteryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLotteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
