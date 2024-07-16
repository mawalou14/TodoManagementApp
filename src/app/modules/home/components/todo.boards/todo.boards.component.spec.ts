import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoBoardsComponent } from './todo.boards.component';

describe('TodoBoardsComponent', () => {
  let component: TodoBoardsComponent;
  let fixture: ComponentFixture<TodoBoardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TodoBoardsComponent]
    });
    fixture = TestBed.createComponent(TodoBoardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
