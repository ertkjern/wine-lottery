import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyLotteriesComponent } from './my-lotteries.component';

describe('MyLotteriesComponent', () => {
  let component: MyLotteriesComponent;
  let fixture: ComponentFixture<MyLotteriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyLotteriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyLotteriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
