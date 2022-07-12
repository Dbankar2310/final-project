import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IBillingDetails } from 'src/app/billingDetails';
import { BillingDetailsService } from 'src/app/services/billing-details.service';
import { CartService } from 'src/app/services/cart.service';
import{FormGroup} from '@angular/forms'
declare var Razorpay:any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

exForm!:FormGroup;
  public product:any=[];
  public grandTotal!:number;
  public totalItem: number=0;
  public shopedmore:boolean=false;
  public discount:boolean=false;
  public showDefault:boolean=false;

  constructor(private cartService: CartService,private toastr:ToastrService, private BillingService:BillingDetailsService ) { }
  FirstName:FormControl = new FormControl("");

  LastName:FormControl = new FormControl("");

  Address:FormControl = new FormControl("");

  City:FormControl = new FormControl("");

  State:FormControl = new FormControl("");

  Postcode:FormControl = new FormControl("");

  MobileNo:FormControl = new FormControl("");

  EmailAddress:FormControl = new FormControl("");

  OrderNotes:FormControl = new FormControl("");

  save(){

    let Billing:IBillingDetails = {

      FirstName:this.FirstName.value,

      LastName:this.LastName.value,

      Address:this.Address.value,

      City:this.City.value,

      State:this.State.value,

      Postcode:parseInt(this.Postcode.value),

      MobileNo:this.MobileNo.value,

      EmailAddress:this.EmailAddress.value,

      OrderNotes:this.OrderNotes.value

    };

    this.BillingService.addProduct(Billing);

  }


  ngOnInit(): void {

    this.cartService.getProducts()
    .subscribe(res=>{
      this.product=res;
      this.grandTotal=this.cartService.getTotalPrice();
    })
    this.cartService.getProducts()
    .subscribe(res=>{
    this.totalItem = res.length;
  })
  //if else condition for shipping charges and
  if(this.grandTotal>5000){
  this.shopedmore=true;
  this.discount=true;
  this.toastr.success('Free shipping specially for you','Wohhoo!',{
positionClass:'toast-top-full-width'
  });
  }
  else if(this.grandTotal>=1){
this.shopedmore=false;
this.discount=true;
  }
  else if(this.grandTotal==0){
    this.shopedmore=false;
    this.discount=false;
      }
  else{
    this.toastr.info(`₹100 has been charged to you`,`Shop more than 5000`,{
      positionClass: 'toast-top-full-width',
      timeOut:2000
    })
  }
}

//razorpay payment integration

message:any;
paymentId = "";
error = "";
title1 = 'razorpay-intergration';
options = {
  "key": "rzp_test_KMuAYKn5Hl8vDL",
  "amount": this.grandTotal,
  "name": "Bhanu Bediya",
  "description": "Payment Details",
  "order_id": "",
  "handler": function (response: any) {
    var event = new CustomEvent("payment.success",
      {
        detail: response,
        bubbles: true,
        cancelable: true
      }
    );
    window.dispatchEvent(event);
  },
  "prefill": {
    "name": "",
    "email": "",
    "contact": ""
  },
  "notes": {
    "address": ""
  },
  "theme": {
    "color": "#3399cc"
  }
};


paynow() {
  this.paymentId = '';
  this.error = '';
  if(this.grandTotal>5000){
  this.options.amount = this.grandTotal*100-100000;
  }
  else if(this.grandTotal>=1){
    this.options.amount = this.grandTotal*100+10000;
    }
    else if(this.grandTotal==0){
      this.options.amount = this.grandTotal*100;//paise
      }

  this.options.prefill.name = "bhanu";
  this.options.prefill.email = "bhanubediya@gmail.com";
  this.options.prefill.contact = "9082356825";
  var rzp1 = new Razorpay(this.options);
  rzp1.open();
  rzp1.on('payment.failed', function (response: any) {
    //this.message = "Payment Failed";
    // Todo - store this information in the server
    console.log(response.error.code);
    console.log(response.error.description);
    console.log(response.error.source);
    console.log(response.error.step);
    console.log(response.error.reason);
    console.log(response.error.metadata.order_id);
    console.log(response.error.metadata.payment_id);
    //this.error = response.error.reason;
  }
  );
}
@HostListener('window:payment.success', ['$event'])
onPaymentSuccess(event: any): void {
  this.message = "Success Payment";
}

submit(post:any){
  console.log("submitted form successfully!")
}


}







