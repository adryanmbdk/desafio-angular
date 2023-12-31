import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaPageRoutingModule } from './lista-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListaPage } from './lista.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaPageRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ],
  declarations: [ListaPage]
})
export class ListaPageModule {}
