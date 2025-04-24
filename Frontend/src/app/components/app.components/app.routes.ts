import { Routes } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { DensityComponent } from '../density/density.component';
import { TreeInputComponent } from '../tree-input/tree-input.component';
import { LocationOverviewComponent } from '../location-overview.component/location-overview.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'density', component: DensityComponent },
  { path: 'tree-input', component: TreeInputComponent },
  {path:'overview',component: LocationOverviewComponent},
  { path: '**', redirectTo: 'search' } // fallback za nepoznate rute
];