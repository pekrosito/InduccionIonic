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
  NamePage = "Mi tiendita"
  TitleStorage = "Productos de mi tiendita"
  productos: any
  aqui: any;

  constructor(private api: dataService, public modalCtrl: ModalController){}

  ngOnInit() {
    this.Initial()
  }

  Initial(){
  //Mis metodos a llamado de BD
    this.api.getProducts().subscribe(
      response => {this.productos = response.map(product => {
        product.image = product.image === "null" ? "../../assets/product.png": product.image
        return product;
      });
      this.productos.forEach(element => {
        if(element.cantidad == 0 || element.habilitado == 0){
          let i = this.productos.indexOf(element);
          this.productos.splice(i, 1);
        }
      });
      
    },
      error =>  {console.log("Error", error)}
    );
  
  }

  showProduct(product){
    this.api.getProductById(product.id_producto).subscribe(
      response => {this.presentModal(response[0])},
      error => {console.log("showProduct", error)}
    );
  }

  async presentModal(producto) {
    const modal = await this.modalCtrl.create({
      component: VentasPage,
      componentProps: { product: producto }
    });
    
    modal.onWillDismiss().then((data) => {this.Initial()});

    return await modal.present();
  }
}
