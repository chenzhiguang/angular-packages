import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderablePage } from './reorderable.page';

describe('ReorderablePage', () => {
  let component: ReorderablePage;
  let fixture: ComponentFixture<ReorderablePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReorderablePage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReorderablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
