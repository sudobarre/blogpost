import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostTileComponent } from './post-tile.component';

describe('PostTileComponent', () => {
  let component: PostTileComponent;
  let fixture: ComponentFixture<PostTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
