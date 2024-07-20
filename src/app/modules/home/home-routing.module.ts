import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfilePageComponent } from './components/profile.page/profile.page.component';
import { TodosPageComponent } from './components/todos.page/todos.page.component';
import { todoResolver } from './resolver/todo.resolver';
import { authGuard } from '../shared/guards/auth.guard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'todos',
        pathMatch: 'full',
      },
      {
        path: 'todos',
        component: TodosPageComponent,
        title: 'Todo Home',
        resolve: { userTodos: todoResolver },
      },
      { path: 'profile', component: ProfilePageComponent, title: 'Profile' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
