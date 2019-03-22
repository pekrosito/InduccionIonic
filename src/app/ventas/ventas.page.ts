import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  object: any;
  title = "Vender producto"

  constructor(public modalCtrl: ModalController) { }

  ngOnInit() {
    console.log(this.object)
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }
}
