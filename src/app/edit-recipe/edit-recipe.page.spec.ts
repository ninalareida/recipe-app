import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRecipePage } from './edit-recipe.page';

describe('EditRecipePage', () => {
  let component: EditRecipePage;
  let fixture: ComponentFixture<EditRecipePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditRecipePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
