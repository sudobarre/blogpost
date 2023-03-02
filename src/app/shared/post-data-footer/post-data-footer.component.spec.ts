import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDataFooterComponent } from './post-data-footer.component';

describe('PostDataFooterComponent', () => {
  let component: PostDataFooterComponent;
  let fixture: ComponentFixture<PostDataFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostDataFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostDataFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
