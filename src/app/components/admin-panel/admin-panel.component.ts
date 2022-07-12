import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IProduct } from 'src/app/iproduct';
import { ProductService } from 'src/app/services/product.service';
import { DialogComponent } from '../dialog/dialog.component';
import { MatCard } from '@angular/material/card';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  showAdd !: boolean;
  formValue !: FormGroup;
  productData !: any;
  p: any
  showUpdate !: boolean;



  title:FormControl = new FormControl("");

  image:FormControl = new FormControl("");

  images:FormControl = new FormControl("");

  description:FormControl = new FormControl("");

  price:FormControl = new FormControl("");

  quantity:FormControl = new FormControl("");

  shortDesc:FormControl = new FormControl("");

  categorie_id:FormControl = new FormControl("");

  category:FormControl = new FormControl("");

  tags:FormControl = new FormControl("");

  addedtowishlist: FormControl = new FormControl("");


  result: IProduct[]=[];
  constructor(private api :ProductService, private formBuilder: FormBuilder,private dialog : MatDialog, private toastr:ToastrService) { }

  ngOnInit(): void {

    // getData is the method that returns all the data which is defined in api service
    this.api.getData().subscribe((data:IProduct[]) =>{
          console.log(data);
          this.result = data;
})
  }




//for open the dialog
openDialog(): void {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '35%'

  }).afterClosed().subscribe(val => {
    if(val === 'save')
    {
      this.api.getData();
    }
  })

}

// for edit the existing product open the dialog
editProduct(dt : IProduct)
{
  this.dialog.open(DialogComponent,{
    width: '30%',
    data: dt
  }).afterClosed().subscribe(val => {
    if(val === 'update')
    {
      this.api.getData();
    }
  })
}

updateProduct(product:IProduct){
  this.api.UpdateProduct(product).subscribe(()=>{
    product;
    console.log('editing done')
  })
}

// for deleting the existing product

deleteProduct(productId : any)
{
  this.api.deleteProduct(productId)  // calling the deleteProduct method from service
  .subscribe({
    next:(res)=>{
      this.toastr.error(`${productId} 🛒 deleted`,`Successfully Deleted!`)
    },
    error:()=>{
      alert("error while deleting the product")
    }
  })
}
}


