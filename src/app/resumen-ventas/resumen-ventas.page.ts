import { Component, OnInit } from '@angular/core';
import { dataService } from '../../api/data.service';
import { ToastController } from '@ionic/angular'

@Component({
  selector: 'app-resumen-ventas',
  templateUrl: './resumen-ventas.page.html',
  styleUrls: ['./resumen-ventas.page.scss'],
})
export class ResumenVentasPage implements OnInit {
  users:any;
  products:[];
  total:any=0;

  constructor(
     private api: dataService
    ,private tCtrl: ToastController
    ) { }

  ngOnInit() {
    this.loadItems()
  }

  loadItems(){
    this.api.getUsers().subscribe(
      response => {this.users = response},
      error =>  {console.log("Error al consultar los usuarios", error)}
    );
  }

  selectedUser(user){
    this.total = 0;
    this.api.getSalesProductByUser(user.detail.value).subscribe(
      response => {
        this.products = response; 
        response.forEach(element => {
          this.total = this.total += (element.precio * element.cantidad_vendidos);  
        });

        if(response.length == 0){  
          this.openToast('No existe ventas para este usuario')
          return;
        }
      },
      error =>  {
        console.log("Error al consultar los productos", error);
        this.openToast('Error al consultar productos')
      }
    );
  }
  
  async openToast(string) {
    const toast = await this.tCtrl.create({
      message: string,
      showCloseButton: true,
      duration: 2500,
      animated: true
    });
    toast.present();
  }
}
