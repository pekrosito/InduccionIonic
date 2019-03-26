import { Injectable } from '@angular/core';
import { ClusterService } from "../app/cluster.service";

@Injectable()
export class dataService {

  constructor(private clusterService: ClusterService){}

  private urlGetproduct = "getProducts";
  private urlCreateProduct = "createProduct";
  private urlGetProductByProductId = "getProductByProductId?id=";
  private urlCreateSale = "createSale";
  private urlUpdateProduct = "updateProduct";

  getProducts(){
    return this.clusterService.getCluster(this.urlGetproduct);
  }

  createProduct(data){
    return this.clusterService.addCluster(this.urlCreateProduct, data);
  }

  getProductById(productId){
    return this.clusterService.getClusterById(this.urlGetProductByProductId, productId);
  }

  createSale(data){
    return this.clusterService.addCluster(this.urlCreateSale, data)
  }

  updateQuantityProduct(data){
    return this.clusterService.updateCluster(this.urlUpdateProduct, data)
  }
}