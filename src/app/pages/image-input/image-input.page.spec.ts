import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageInputPage } from './image-input.page';

describe('ImageInputPage', () => {
  let component: ImageInputPage;
  let fixture: ComponentFixture<ImageInputPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageInputPage],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
