import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTodoModalComponent } from './add-edit-todo.modal.component';

describe('AddEditTodoModalComponent', () => {
  let component: AddEditTodoModalComponent;
  let fixture: ComponentFixture<AddEditTodoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditTodoModalComponent]
    });
    fixture = TestBed.createComponent(AddEditTodoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
