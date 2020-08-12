import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { NotificationComponent } from './page/notification/notification.component';
import { TransactionComponent } from './page/transaction/transaction.component';
import { UsersComponent } from './page/users/users.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/users' },
  {
    path: 'login',
    // tslint:disable-next-line:object-literal-sort-keys
    component: LoginComponent,
  },
  {
    path: 'users',
    // tslint:disable-next-line:object-literal-sort-keys
    component: UsersComponent,
  },
  {
    path: 'transactions',
    // tslint:disable-next-line:object-literal-sort-keys
    component: TransactionComponent,
  },
  {
    path: 'notification',
    // tslint:disable-next-line:object-literal-sort-keys
    component: NotificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  // tslint:disable-next-line:object-literal-sort-keys
  exports: [RouterModule],
})
export class AppRoutingModule { }
