import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TodosPageComponent } from './components/todos.page/todos.page.component';
import { ProfilePageComponent } from './components/profile.page/profile.page.component';
import { AddEditTodoModalComponent } from './modal/add-edit-todo.modal/add-edit-todo.modal.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslocoModule } from '@jsverse/transloco';
import { HeaderComponent } from './components/header/header.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { TodoBoardsComponent } from './components/todo.boards/todo.boards.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConfirmationModalComponent } from './modal/confirmation.modal/confirmation.modal.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
    TodosPageComponent,
    ProfilePageComponent,
    AddEditTodoModalComponent,
    HeaderComponent,
    TodoBoardsComponent,
    ConfirmationModalComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    TranslocoModule,
    DragDropModule,
    MatChipsModule,
    MatExpansionModule,
    MatMenuModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    SharedModule,
  ],
  providers: [MatDatepickerModule],
})
export class HomeModule {}
