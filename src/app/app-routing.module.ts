import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { MainComponent } from './pages/main/main.component';

const routes: Routes = [
  {
    path:'',
    component: MainComponent,
  },
  {
    path: 'card',
    loadChildren: () => import('./card/card.module').then(mod => mod.CardModule),
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'type',
    loadChildren: () => import('./type/type.module').then(mod => mod.TypeModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
