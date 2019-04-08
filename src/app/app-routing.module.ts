import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'almacen', loadChildren: './almacen/almacen.module#AlmacenPageModule' },
  { path: 'ventas', loadChildren: './ventas/ventas.module#VentasPageModule' },
  { path: 'resumen-ventas', loadChildren: './resumen-ventas/resumen-ventas.module#ResumenVentasPageModule' },  { path: 'crear-producto', loadChildren: './crear-producto/crear-producto.module#CrearProductoPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
