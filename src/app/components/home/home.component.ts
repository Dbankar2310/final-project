import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/iproduct';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { ToastrService } from 'ngx-toastr';
// import { WishlistService } from 'src/app/services/wishlist.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
p:any;

searchkey:string='';
public filtercategory : IProduct[]=[];
isExistInCart:boolean = false;
public searchterm:string='';
public totalItem: number=0;
  result:IProduct[]=[];
  constructor(private productService:ProductService, private cartService: CartService, private toastr:ToastrService,  private wishlistCartService:WishlistCartService)  { }


  ngOnInit(): void {
//subscribing and string data in result then in filtercategory from product service
    this.productService.getData().subscribe((data:IProduct[]) =>{
      this.cartService.getProducts()
      .subscribe(res=>{
      this.totalItem = res.length;// to find the length of the array
    })
          console.log(data);
          this.result = data;
          //for sorting the product by their category

          this.filtercategory = data;

          //campare and set the category of the product
          this.result.forEach((a:any)=>{

            if(a.category === "fasion"){
              a.category = "Shirts for Mens"
            }
            else if(a.category === "girl fasion"){
              a.category = "Tops for Womens"
            }
            else if(a.category === "electronic"){
              a.category = "Laptops"
            }
            else if(a.category === "mobile"){
              a.category = "SmartPhones"
            }
            else{
              a.category = "Watches"
            }
            Object.assign(a,{quantity:1,total:(a.price*a.quantity)})//showing the product price on the home page
          });
          console.log(this.result);
        });

        // searchkey
        this.cartService.search.subscribe((val:any)=>{
          this.searchkey=val;
        })
      }


//added to cart calling from cart service
      addtocart(dt:IProduct){
        dt.addedtocart=true;
        this.cartService.addtoCart(dt);
        }

//filter the product by category and return the result to the homepage which is display on clicking the particular category
      filter(category : string){
        this.filtercategory = this.result
        .filter((a:any) =>{
          if(a.category == category || category == ''){
            return a;
          }
        })
      }

//search event for search bar
      search(event:any){
        this.searchterm=(event.target as HTMLInputElement).value;
        this.cartService.search.next(this.searchterm);
      }


//updating boolean column in database i.e(addedtowishlist)
updateBool(product:IProduct){
 product.addedtowishlist=!product.addedtowishlist;
 this.wishlistCartService.addToWishlistCart(product);
      this.productService.updateBool(product).subscribe(()=>{
  product;
  console.log('addedtowishlist true');
      })
}
//updating boolean colum in database i.e(addedtocartt)
updateCartBool(product:IProduct){
product.addedtocart=product.addedtocart;//toggling between true and false
this.productService.EditCart(product).subscribe(()=>{ //subscribing data
  product;
  console.log('cart Boolean change')
})
}
// remove cart item through button in mat-card and also updating boolean val in database
removeCartItem(product:IProduct){
  product.addedtocart=!product.addedtocart;//toggling between true and false
  this.productService.EditCart(product).subscribe(()=>{ //subscribing data
    product;
    console.log('cart Boolean change')
  })
  this.cartService.removeCartItem(product);//calling remove cartitem from cart service
}
}














