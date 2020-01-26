import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModelListComponent } from './model-list/model-list.component';
import { FavoritesComponent } from './favorites/favorites.component';


const routes: Routes = [
  {
    path: 'model-list',
    component: ModelListComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  { path: '',   redirectTo: '/model-list', pathMatch: 'full' },
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
