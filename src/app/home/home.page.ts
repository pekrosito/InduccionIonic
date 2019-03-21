import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  NamePage = "Tienda de Petra"
  TitleStorage = "Productos de la tienda de Petra"
  productos: any

  constructor(){}

  ngOnInit() {
    this.Initial()
  }

  Initial(){
  //Mis metodos a llamado de BD
  /*this.apiService.login().suscribe(
      response => {data => this.productos.map(fnction(data) => data.)},
      error => console.log("----")
  );*/
    this.productos = [{
      producto_Id:1, nombre:"Cocosette", precio:"1300", 
      cantidad:23,id_tipo_producto:2,oferta:0
    },{
      producto_Id:2, nombre:"Chocolate", precio:"1600", 
      cantidad:0,id_tipo_producto:2,oferta:0
    },{
      producto_Id:3, nombre:"Doritos", precio:"1500", 
      cantidad:23,id_tipo_producto:2,oferta:0
    }]

    console.log("data", this.productos  )
  }

  showProduct(product){
    console.log(product)
  }
}
