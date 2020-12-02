import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { env } from 'process';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }



  getAllPost(){
   return this.http.get(environment.URI)
  }

  savePost(post){
    return this.http.post(environment.URI, post)
  }

  getOnePost(id:number){
    return this.http.get(environment.URI+ "/" +id)  
  }

  deletePost(id:number){
   return this.http.delete(environment.URI+ "/" +id)
  }

  updatePost(id:number, post){
    return this.http.put(environment.URI+ "/" +id, post)
  }


}
