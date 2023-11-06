import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  url: string = 'https://jsonplaceholder.typicode.com/posts/';
  constructor(private httpClient: HttpClient) {}

    async listar(){
      return await this.httpClient.get(this.url).toPromise();
    }

    async procurarPorId(id: number){
      return await this.httpClient.get(this.url + id).toPromise();
    }

}
