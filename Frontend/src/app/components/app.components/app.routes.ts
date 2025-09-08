import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { DensityComponent } from '../density/density.component';
import { TreeInputComponent } from '../tree-input/tree-input.component';
import { LocationOverviewComponent } from '../location-overview.component/location-overview.component';
import { authGuard } from '@app/auth/auth.guard';
import { ProfileComponent } from '@app/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGuard } from '@app/services/admin.guard';



export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    loadComponent: () => import('../../auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'admin',
    loadComponent: () => import('../app.components/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard]
  },

  {
    path: 'search',
    loadComponent: () => import('../search/search.component').then(m => m.SearchComponent),
    canActivate: [authGuard]
  },
  {
    path: 'density',
    loadComponent: () => import('../density/density.component').then(m => m.DensityComponent),
    canActivate:[authGuard]
  },
  {
    path: 'tree-input',
    loadComponent: () => import('../tree-input/tree-input.component').then(m => m.TreeInputComponent),
    canActivate:[authGuard]
  },
  {
    path: 'overview',
    loadComponent: () => import('../location-overview.component/location-overview.component').then(m => m.LocationOverviewComponent),
    canActivate:[authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('@app/profile/profile.component').then(m => m.ProfileComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: 'login' },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard]
  }
];
