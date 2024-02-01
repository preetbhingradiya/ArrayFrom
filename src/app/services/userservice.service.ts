import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  url='http://localhost:3000/posts'

  constructor(private http:HttpClient) { }

  getUser(){
    return this.http.get(this.url)
  }

  postUser(data:any){
    return this.http.post(this.url,data)
  }

  updateUser(id:any,data:any){
    let updateUrl=`${this.url}/${id}`
    return this.http.patch(updateUrl,data)
  }

  deleteUser(id){
    let deleteUrl=`${this.url}/${id}`
    return this.http.delete(deleteUrl)
  }
}
