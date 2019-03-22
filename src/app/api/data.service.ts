import { Injectable } from '@angular/core';
import { ClusterService } from "../cluster.service";

@Injectable()
export class dataService {

  constructor(private clusterService: ClusterService){}

  private urlGetproduct = "getProducts";

  getProducts(){
    console.log("----")
      return this.clusterService.getCluster(this.urlGetproduct);
  }
}