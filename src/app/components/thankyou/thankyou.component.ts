import { Component, OnInit } from '@angular/core';
import { IBillingDetails } from 'src/app/billingDetails';
import { IProduct } from 'src/app/iproduct';
import { BillingDetailsService } from 'src/app/services/billing-details.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.css']
})
export class ThankyouComponent implements OnInit {
bill:IBillingDetails[]=[];
public product:IProduct[]=[];
public grandTotal!:number;
dateObj= Date.now();
public shopedmore:boolean=false;
public discount:boolean=false;
public showDefault:boolean=false;
  constructor( private billingDetails:BillingDetailsService, private cartService:CartService) { }

  ngOnInit(): void {
    //billing details data subscribing
    this.billingDetails.getBillingDetails().subscribe((data:IBillingDetails[])=>{
      console.log(data)
      this.bill=data;
      console.log(this.bill)
    })

//cartservice data storing in product by subscribing
    this.cartService.getProducts()
    .subscribe(res=>{
      this.product=res;
      this.grandTotal=this.cartService.getTotalPrice();
    })

      //if else condition for shipping charges and
  if(this.grandTotal>5000){
    this.shopedmore=true;
    this.discount=true;
    }
    else if(this.grandTotal>=1){
  this.shopedmore=false;
  this.discount=true;
    }
    else if(this.grandTotal==0){
      this.shopedmore=false;
      this.discount=false;
        }
      }
//


}
