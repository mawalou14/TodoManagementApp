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
import { GeneralLoadingComponent } from '../shared/components/general-loading/general-loading.component';
import { HeaderComponent } from './components/header/header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { TodoBoardsComponent } from './components/todo.boards/todo.boards.component';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  declarations: [
    HomeComponent,
    TodosPageComponent,
    ProfilePageComponent,
    AddEditTodoModalComponent,
    GeneralLoadingComponent,
    HeaderComponent,
    TodoBoardsComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    FormsModule,
    TranslocoModule,
    DragDropModule,
    MatChipsModule,
    MatExpansionModule,
    MatMenuModule,
  ],
})
export class HomeModule {}
