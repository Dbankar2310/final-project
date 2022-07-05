import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { WishlistCartService } from 'src/app/services/wishlist-cart.service';
// import { WishlistService } from 'src/app/services/wishlist.service';
import { WishListAPI } from 'src/app/wishlistAPI';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    redirectTo: 'login'
  }]

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem: number=0;
  public searchterm:string='';
  wishlistArray: WishListAPI[]=[];
  router: any;

constructor(private cartService: CartService,private wishlistCartService:WishlistCartService) { }


ngOnInit(): void {

//subscribing and finding length of array
  this.cartService.getProducts()
  .subscribe(res=>{
  this.totalItem = res.length;
})
}

//search method to fire an event and get the value to show in html
search(event:any){
this.searchterm=(event.target as HTMLInputElement).value;
this.cartService.search.next(this.searchterm);
}


}

