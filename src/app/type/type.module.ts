import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeRoutingModule } from './type-routing.module';
import { TypeLayoutComponent } from './shared/components/type-layout/type-layout.component';
import { TypeItemComponent } from './pages/type-item/type-item.component';
import { TypeListComponent } from './pages/type-list/type-list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    TypeLayoutComponent,
    TypeItemComponent,
    TypeListComponent
  ],
  imports: [
    CommonModule,
    TypeRoutingModule,
    ReactiveFormsModule
  ]
})
export class TypeModule { }
