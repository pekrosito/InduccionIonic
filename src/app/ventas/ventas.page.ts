import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  ventas: any;

  constructor() { }

  ngOnInit() {
    this.Initial();
  }

    Initial(){
      this.ventas = [{
        id_ventas:1, id_producto:1, cantidad:10
      },{
        id_ventas:2, id_producto:2, cantidad:22
      },{
        id_ventas:3, id_producto:3, cantidad:12
      }]
    }
}
