import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumSideBarComponent } from './forum-side-bar.component';

describe('ForumSideBarComponent', () => {
  let component: ForumSideBarComponent;
  let fixture: ComponentFixture<ForumSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
