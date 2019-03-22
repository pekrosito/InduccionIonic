import { VentasPage } from './../ventas/ventas.page';

import { Component } from '@angular/core';
import { dataService } from '../../api/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  NamePage = "Tienda de Petra"
  TitleStorage = "Productos de la tienda de Petra"
  productos: any

  constructor(private api: dataService, public modalCtrl: ModalController){}

  ngOnInit() {
    this.Initial()
  }

  Initial(){
  //Mis metodos a llamado de BD
    this.api.getProducts().subscribe(
      response => {this.productos = response},
      error =>  {console.log("Error", error)}
    );
  
  }

  showProduct(product){
    this.api.getProductById(product.id_producto).subscribe(
      response => {this.presentModal(response);},
      error => {console.log("showProduct", error)}
    );
  }

  async presentModal(response) {
    const modal = await this.modalCtrl.create({
      component: VentasPage,
      componentProps: { object: response }
    });
    
    return await modal.present();
  }
}
