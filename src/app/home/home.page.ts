
import { Component } from '@angular/core';
import { dataService } from '../api/data.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  NamePage = "Tienda de Petra"
  TitleStorage = "Productos de la tienda de Petra"
  productos: any

  constructor(private api: dataService){}

  ngOnInit() {
    this.Initial()
  }

  Initial(){
  //Mis metodos a llamado de BD
  this.api.getProducts().subscribe(data => { this.productos = data});
    console.log("data", this.productos  )
  }

  showProduct(product){
    console.log(product)
  }
}
