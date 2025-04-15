import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { DensityComponent } from './components/density/density.component';
import { TreeInputComponent } from './components/tree-input/tree-input.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'volume', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'density', component: DensityComponent },
  { path: 'volume', component: TreeInputComponent },

];