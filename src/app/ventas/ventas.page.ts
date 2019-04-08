import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
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
  product: any;
  title = "Vender producto"
  total:any = 0;
  loading;

  constructor(public modalCtrl: ModalController, 
    private formBuilder: FormBuilder, 
     public loadingController: LoadingController,
     private api: dataService
     ,private tCtrl: ToastController) { }

  ngOnInit() {
    this.loadForm();
    this.setForm(this.product);
  }

  loadForm(){
    this.formSale = this.formBuilder.group({
      id_producto: new FormControl({value:'', disabled:false}),
      descripcion: new FormControl({value:'', disabled:false}, Validators.required),
      precio: new FormControl({value:'', disabled:false}),
      cantidad: new FormControl({value:'', disabled:false}, [Validators.required, Validators.minLength(1), Validators.min(1), Validators.max(this.product.cantidad)]),
    })
  }

  setForm(data){
    this.formSale.get('id_producto').setValue(data.id_producto);
    this.formSale.get('descripcion').setValue(data.descripcion);
    this.formSale.get('precio').setValue(data.precio);
    this.formSale.get('cantidad').setValue(null);
  }

  calcular(){
   let cantidad = this.formSale.get('cantidad').value;
   let precio = this.formSale.get('precio').value;
   if(cantidad == null){
    this.total = 0;
   }else{
    this.total = parseInt(cantidad) * parseInt(precio);
   }
  }

  sale(){
    if(!this.formSale.valid){
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
        response => { this.updateProduct();},
        error => {console.log("error", error)}
      )
  }

  updateProduct(){
    let product = {
      id: this.formSale.value.id_producto,
      cantidad: this.product.cantidad - this.formSale.get('cantidad').value
    }

    this.api.updateProductSale(product).subscribe(
      response => {
        this.closeModal();
        this.openToast('Producto vendido con exito');
      },
      error => {console.log("error", error)}
    )
    
  }

  closeModal(){
    this.modalCtrl.dismiss();
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

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'Cargando',
      duration: 200
    });
    await this.loading.present();
  }
}
