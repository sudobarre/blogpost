import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForumsComponent } from './list-forums.component';

describe('ListForumsComponent', () => {
  let component: ListForumsComponent;
  let fixture: ComponentFixture<ListForumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListForumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
