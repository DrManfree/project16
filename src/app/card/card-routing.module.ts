import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardItemComponent } from './pages/card-item/card-item.component';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardLayoutComponent } from './shared/components/card-layout/card-layout.component';

const routes: Routes = [
  {
    path: '',
    component: CardLayoutComponent,
    children: [
      {
        path:'', component: CardListComponent
      },
      {
        path:'item/:id', component: CardItemComponent
      },
      {
        path:'item', component: CardItemComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CardRoutingModule { }
