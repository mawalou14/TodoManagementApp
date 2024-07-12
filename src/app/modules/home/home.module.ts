import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TodosPageComponent } from './components/todos.page/todos.page.component';
import { ProfilePageComponent } from './components/profile.page/profile.page.component';
import { AddEditTodoModalComponent } from './modal/add-edit-todo.modal/add-edit-todo.modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';

@NgModule({
  declarations: [
    HomeComponent,
    TodosPageComponent,
    ProfilePageComponent,
    AddEditTodoModalComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    FormsModule,
    TranslocoModule,
  ],
})
export class HomeModule {}
