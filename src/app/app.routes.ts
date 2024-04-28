import { Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';

export const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "/login",
  //   pathMatch: "full",
  // },
  {
    path: '',
    component: DashboardComponent,
  },
  // {
  //   path: "login",
  //   component: LoginNewComponent,
  //   canActivate: [AuthGuard]
  // },
];
