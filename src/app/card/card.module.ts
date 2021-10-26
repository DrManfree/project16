import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRoutingModule } from './card-routing.module';
import { CardListComponent } from './pages/card-list/card-list.component';
import { CardItemComponent } from './pages/card-item/card-item.component';
import { CardLayoutComponent } from './shared/components/card-layout/card-layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CardListComponent,
    CardItemComponent,
    CardLayoutComponent
  ],
  imports: [
    CommonModule,
    CardRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CardModule { }
