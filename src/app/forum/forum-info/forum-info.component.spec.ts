import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumInfoComponent } from './forum-info.component';

describe('ForumInfoComponent', () => {
  let component: ForumInfoComponent;
  let fixture: ComponentFixture<ForumInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
