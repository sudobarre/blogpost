import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserForumsComponent } from './user-forums.component';

describe('UserForumsComponent', () => {
  let component: UserForumsComponent;
  let fixture: ComponentFixture<UserForumsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserForumsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserForumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
