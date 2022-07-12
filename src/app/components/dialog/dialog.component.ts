import { Component,Inject, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

import {MatDialog} from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { FormBuilder, FormControl, FormControlName, FormGroup, NgForm, NgModel, Validator, Validators } from '@angular/forms';
import { IProduct } from 'src/app/iproduct';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  actionBtn : string = "Save";


  title:FormControl = new FormControl("");
  image : FormControl = new FormControl("");
  images : FormControl = new FormControl("");
  description : FormControl = new FormControl("");
  price : FormControl = new FormControl("");
  quantity : FormControl = new FormControl("");
  shortDesc : FormControl = new FormControl("");
  categorie_id : FormControl = new FormControl("");
  category : FormControl = new FormControl("");
  tags : FormControl = new FormControl("");


  productForm = new FormGroup({

    title : new FormControl(""),
    image : new FormControl(""),
    images : new FormControl(""),
    description : new FormControl(""),
    price : new FormControl(""),
    quantity : new FormControl(""),
    shortDesc : new FormControl(""),
    categorie_id : new FormControl(""),
    category : new FormControl(""),
    tags : new FormControl(""),
  })
  result:IProduct[]=[];
  constructor(private productService:ProductService,public dialog: MatDialog,private formBuilder: FormBuilder, private dialogRef : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : IProduct,private http: HttpClient) { }

  ngOnInit(): void {
   this.productService.getData().subscribe((data:IProduct[]) =>{


    this.result = data;
    })

//setting the data to the particular form fields for updation
    if(this.editData)
    {
      this.actionBtn = "Update";

      this.title.setValue(this.editData.title);
      this.image.setValue(this.editData.image);
      this.images.setValue(this.editData.images);
      this.description.setValue(this.editData.description);
      this.price.setValue(this.editData.price);
      this.quantity.setValue(this.editData.quantity);
      this.shortDesc.setValue(this.editData.shortDesc);
      this.categorie_id.setValue(this.editData.categorie_id);
      this.category.setValue(this.editData.category);
      this.tags.setValue(this.editData.tags);
     }
  }
//add the new product
  save()
     {
      if(!this.editData)
      {
      let product : IProduct = {

        title: this.title.value,
        image: this.image.value,
        images: this.images.value,
        description: this.description.value,
        price: parseFloat(this.price.value),
        quantity: parseInt (this.quantity.value),
        shortDesc: this.shortDesc.value,
        categorie_id: parseInt(this.categorie_id.value),
        category: this.category.value,
        tags: this.tags.value,


      };
      this.productService.addProduct(product);
      alert("Product added succesfully");
      this.dialogRef.close();
      this.productService.getData();

    }

    else
    {
       return;
    }

}


//updating the existing product
updateProduct(product:IProduct){
  this.productService.UpdateProduct(product).subscribe(()=>{
    product;
    console.log('editing done')
  })
}

}


