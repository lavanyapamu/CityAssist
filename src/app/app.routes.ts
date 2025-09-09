import { Routes } from '@angular/router';
import { Cases } from './features/dashboard/cases/cases';
import { Dashboard } from './features/dashboard/dashboard';
import { FileCase } from './features/dashboard/file-case/file-case';
import { Settings } from './features/dashboard/settings/settings';
import { Editcase } from './features/editcase/editcase';
import { Registration } from './features/registration/registration';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';
import { Login } from './features/login/login';
import { Admin } from './features/admin/admin';
import { aDashboard } from './features/admin/dashboard/dashboard';
import { Profile } from './features/profile/profile';

export const routes: Routes = [
  { path: 'register', component: Registration },
  { path: 'login', component: Login },

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'citizen' },
    children: [
      { path: 'cases', component: Cases },
      { path: 'fileacase', component: FileCase },
      { path: 'profile', component: Profile},
      { path: 'editcase/:case_id', component: Editcase },
      { path: '', redirectTo: 'cases', pathMatch: 'full' }
    ]
  },

  {
    path: 'admin',
    component: Admin,
    canActivate: [authGuard, roleGuard],
    data: { expectedRole: 'admin' },
     children: [
      { path: 'dashboard', component:aDashboard},
      { path: 'profile', component: Profile},
     ]
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
