import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { dataService } from '../../api/data.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styleUrls: ['./ventas.page.scss'],
})
export class VentasPage implements OnInit {
  formSale: FormGroup;
  object: any;
  title = "Vender producto"
  total:any = 0;
  loading;

  constructor(public modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
     public loadingController: LoadingController,
     private api: dataService) { }

  ngOnInit() {
    console.log(this.object)
    this.loadForm();
    this.setForm(this.object[0]);
  }

  loadForm(){
    this.formSale = this.formBuilder.group({
      id_producto: new FormControl({value:'', disabled:false}),
      descripcion: new FormControl({value:'', disabled:false}, Validators.required),
      //nombre: new FormControl({value:'', disabled:true}),
      precio: new FormControl({value:'', disabled:false}),
      cantidad: new FormControl({value:'', disabled:false}, [Validators.required, Validators.minLength(1), Validators.min(1)]),
    })
  }

  setForm(data){
    this.formSale.get('id_producto').setValue(data.id_producto);
    this.formSale.get('descripcion').setValue(data.descripcion);
    this.formSale.get('precio').setValue(data.precio);
    this.formSale.get('cantidad').setValue(0);
  }

  calcular(){
   let cantidad = this.formSale.get('cantidad').value;
   let precio = this.formSale.get('precio').value;
   this.total = parseInt(cantidad) * parseInt(precio);
  }

  sale(){
    if(!this.formSale.valid){
      //complete la cantidad
      return
    }

    this.presentLoading();

    let sale = {
      id_venta: 1,
      id_producto: this.formSale.value.id_producto,
      id_usuario: 1,
      cantidad: this.formSale.value.cantidad
      }
    
      this.api.createSale(sale).subscribe(
        response => { this.updateProduct(); },
        error => {console.log("error", error)}
      )
  }

  updateProduct(){
    let product = {
      id_producto: this.formSale.value.id_producto,
      cantidad: this.formSale.value.cantidad
    }

    this.api.createSale(product).subscribe(
      response => {this.loading.dismiss(); this.modalCtrl.dismiss();},
      error => {console.log("error", error)}
    )
    
  }

  closeModal()
  {
    this.modalCtrl.dismiss();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 15000
    });
    await this.loading.present();
  }
}
