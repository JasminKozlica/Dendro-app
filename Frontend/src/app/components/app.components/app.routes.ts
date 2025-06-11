import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { DensityComponent } from '../density/density.component';
import { TreeInputComponent } from '../tree-input/tree-input.component';
import { LocationOverviewComponent } from '../location-overview.component/location-overview.component';
import { authGuard } from '@app/auth/auth.guard';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path:'login',
    loadComponent:() => import('../../auth/login/login.component').then(m => m.LoginComponent)
  },

   {
    path: 'register',
    loadComponent: () => import('../../auth/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('../search/search.component').then(m => m.SearchComponent),
    canActivate: [authGuard]
  },
  { path: 'density', component: DensityComponent },
  { path: 'tree-input', component: TreeInputComponent },
  {path:'overview',component: LocationOverviewComponent},
  { path: '**', redirectTo: 'search' } // fallback za nepoznate rute
];