import { Injectable } from '@angular/core';
import{HttpClient}from '@angular/common/http'
import { IProduct } from '../iproduct';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   url="https://localhost:5001/api"



  constructor(private http:HttpClient) { }
//get method to call all data and store in observable
  getData():Observable<IProduct[]>{
    return this.http.get<IProduct[]>(this.url+'/Products');
  }

  //get single product by Id method
  getSingleProduct(productId: Number): Observable<IProduct[]> {
    console.log(productId)
  return this.http.get<IProduct[]>(this.url + '/Products' + productId);
  }

//adding product in to main array for Admin only
  addProduct(val:IProduct){
    this.http.post<IProduct>(this.url+'/Products',val, {
      headers:{
        "Access-Control-Allow-Origin":"*"
      }
    }).subscribe(result => console.log("Data entered in Database Successfully !"));
  }

  //updating boolean value of addedtocart in table
  UpdateProduct(val:IProduct){
    return this.http.put(this.url+'/Products/'+val.productId,val)
  }

  //updating boolean value of addedtowishlist in table
  updateBool(addedtowishlist1:IProduct){
    return this.http.put(this.url+'/Products/'+ addedtowishlist1.productId,addedtowishlist1)
  }

  //deleting product from main array for Admin only
  deleteProduct(val:IProduct){
    return this.http.delete(this.url+'/Products/'+val)
  }

//Editing product details put method for Admin only
  EditCart(val:IProduct){
        return this.http.put(this.url+'/Products/'+val.productId,val)
      }

  }





