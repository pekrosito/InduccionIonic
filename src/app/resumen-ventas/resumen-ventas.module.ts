import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ResumenVentasPage } from './resumen-ventas.page';

const routes: Routes = [
  {
    path: '',
    component: ResumenVentasPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ResumenVentasPage]
})
export class ResumenVentasPageModule {}
