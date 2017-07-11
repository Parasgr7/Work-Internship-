import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LazyComponent } from './lazy.component';

const routes: Routes = [
  { path: 'lazy', component: LazyComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);