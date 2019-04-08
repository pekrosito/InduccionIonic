import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { ImageResizer, ImageResizerOptions } from '@ionic-native/image-resizer/ngx';
import { dataService } from '../../api/data.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.page.html',
  styleUrls: ['./crear-producto.page.scss'],
})
export class CrearProductoPage implements OnInit {
  product: any;
  action: String;
  formView: number;
  formProduct: FormGroup;
  image: string = null;
  private imageSrc: string;
  idProduct = null;

  constructor(
     public modalController: ModalController
    ,private navParams: NavParams
    ,private formBuilder: FormBuilder  
    ,private camera: Camera
    ,private photoLibrary: PhotoLibrary
    ,private imageResizer: ImageResizer 
    ,private api: dataService
    ,private tCtrl: ToastController
    ) {
    this.product = navParams.get('product');
   }

  ngOnInit() {
    this.loadForm();
    
    if(this.product != null){
      this.action = "Modificar";
      this.formView = 1;      
      this.image = this.product.image;
      this.setForm(this.product);
    }else{
      this.action = "Agregar";
      this.formView = 2;
      this.product = {"image":"../../assets/product.png"}
      this.formProduct.get('habilitado').setValue(1);
    }    
  }

  loadForm(){
    this.formProduct = this.formBuilder.group({
      cantidad: new FormControl({value:'', disabled:false}, [Validators.required, Validators.minLength(1), Validators.min(1)]),
      nombre: new FormControl({value:'', disabled:false}, Validators.required),
      precio: new FormControl({value:'', disabled:false}, [Validators.required, Validators.minLength(1), Validators.min(1)]),
      habilitado: new FormControl({value:'', disabled:false})
    })
  }

  setForm(product){
    this.formProduct.get('cantidad').setValue(product.cantidad);
    this.formProduct.get('nombre').setValue(product.nombre);
    this.formProduct.get('precio').setValue(product.precio);
    this.formProduct.get('habilitado').setValue(product.habilitado);
    this.idProduct = product.id_producto;
  }

  closeModal() {
    this.modalController.dismiss();
  }
  
  resize(uri){
    let options = {
      uri: uri,
      folderName: 'Protonet',
      quality: 90,
      width: 1280,
      height: 1280
     } as ImageResizerOptions;
     
     this.imageResizer
       .resize(options)
       .then((filePath: string) => console.log('FilePath', filePath))
       .catch(e => console.log(e));
  }

  getPicture(){
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      quality: 50
    }

    this.camera.getPicture( options )
    .then(imageData => {
      this.product.image = `data:image/jpeg;base64,${imageData}`;
      this.image = `data:image/jpeg;base64,${imageData}`;
    })
    .catch(error =>{
      console.error( error );
    });
  }
  
  saveProduct(){
    this.product = this.formProduct.value;
    this.product.image = this.image;
    this.product.id = this.idProduct;

    if(this.product.id == null){
      this.api.createProduct(this.product).subscribe(
        response => {
          this.openToast('Producto Creado con exito!');
          this.modalController.dismiss(); 
        },
        error => {this.openToast('Error al crear el producto')}
      )
    }else{
      this.api.updateProduct(this.product).subscribe(
        response => {
          this.openToast('Producto actualizado con exito!');
          this.modalController.dismiss(); 
        },
        error => {this.openToast('Error al actualizar el producto')}
      )
    }
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

  private openGallery (): void {
    let cameraOptions = {
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,      
      quality: 90,
      targetWidth: 1000,
      targetHeight: 1000,
      width: 220,
      height: 200,
      encodingType: this.camera.EncodingType.JPEG,    
      //mediaType: this.camera.MediaType.PICTURE,  
      correctOrientation: true
    }
  
    this.camera.getPicture(cameraOptions)
      .then(FILE_URI => {
        this.imageSrc = `data:image/jpeg;base64,${FILE_URI}`; 
        this.resize(this.imageSrc), console.log(this.imageSrc)
      }, 
      err => console.log(err));   
  }

}
