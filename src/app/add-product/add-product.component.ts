import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser'
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup;
  isSubmitting = false;
  errors: Object = {};
  submitted = false;
  loading = false;
  reader = new FileReader();
  image = "";
  primary_image : any = "";
  usage_file : any = "";
  gallery_images = "";
  sellerid: number;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.productForm = this.fb.group({
      productcode : ['', Validators.required],
      productname: ['', Validators.required],
      shortdescription: ['', Validators.required],
      longdescription: '',
      dimensions: '',
      category: '',
      mrp: '',
      ssp: '',
      ymp: '',
      primaryimage: '',
      galleryimages: '',
      usageinstructions: '',
      extrainformation: ''
    });
  }

  ngOnInit() {
    this.getSellerId();
    this.reader.onloadend = (e) => { this.image = btoa(e.target.result);}
  }

  get f() {
    return this.productForm.controls;
  }

  onPrimaryImage(event: any) {
    let files = event.target.files;
    this.reader.readAsDataURL(files[0]);
    this.primary_image = this.image;
  }

  onUsageInstructions(event: any){
    let files = event.target.files;
    this.reader.readAsDataURL(files[0]);
    this.usage_file = this.image;
  }

  onGalleryImages(event: any){
    let files = event.target.files;
    Array.from(files).forEach((d) => { this.reader.readAsDataURL(d); this.gallery_images = this.gallery_images +","+(this.image);});
  }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.productForm.invalid) {
          return;
      }
      let f = this.productForm.value;
      let jsonToBeSent = {
        "product_id": Number(f.productcode),
        "name": f.productname,
        "short_description": f.shortdescription,
        "long_description": f.longdescription,
        "dimensions": f.dimensions,
        "categories": f.category,
        "mrp": f.mrp,
        "ssp": f.ssp,
        "ymp": f.ymp,
        "image_dir": this.gallery_images,
        "primary_image":this.primary_image,
          "usage_inst_file": this.usage_file,
        "status": "NEW",
        "seller": {"seller_id": this.sellerid}
      }

      this.http.post<any>("http://localhost:18080/PMP-backend/api/products", jsonToBeSent).subscribe((data:any) => {this.router.navigate(['/list-product']); });
    }

    getSellerId() {
      this.http.get( `http://localhost:18080/PMP-backend/api/sellers/token/${localStorage.getItem("token")}`).subscribe((data:any) => {this.sellerid = data.seller_id;});
    }

}
