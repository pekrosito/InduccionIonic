import { Injectable } from '@angular/core';
import { ClusterService } from "../app/cluster.service";

@Injectable()
export class dataService {

  constructor(private clusterService: ClusterService){}

  private urlGetproduct = "getProducts";
  private urlCreateProduct = "createProduct";
  private urlGetProductByProductId = "getProductByProductId";
  private urlCreateSale = "createSale";
  private urlUpdateProduct = "updateProduct";
  private urGetUsers = "getUsers";
  private urlGetSalesProductByUser = "getSalesProductByUser";
  private urlUpdateStateProduct = "updateStateProductById";
  private urlUpdateProductSale = "updateProductSale";

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

  updateProduct(data){
    return this.clusterService.updateCluster(this.urlUpdateProduct, data)
  }

  getUsers(){
    return this.clusterService.getCluster(this.urGetUsers);
  }

  getSalesProductByUser(userId){
    return this.clusterService.getClusterById(this.urlGetSalesProductByUser, userId);
  }

  enableDisableProduct(product){
    return this.clusterService.updateCluster(this.urlUpdateStateProduct, product);
  }

  updateProductSale(data){
    return this.clusterService.updateCluster(this.urlUpdateProductSale, data);    
  }
}