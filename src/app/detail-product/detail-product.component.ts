import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http' ;


@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  product_id: number;
  product: any;
  @ViewChild("slideshow") slideshow: any;
  imageSources: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private http: HttpClient
  ) {
    this.activatedRoute.params.subscribe(p => {
      this.product_id = p['code'];
    });
  }

  ngOnInit() {
      this.http.get(`http://localhost:18080/PMP-backend/api/products/${this.product_id}`).subscribe((data:any) => {this.product = data; this.imageSources = data.image_dir.split(",") });
  }

}
