import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { map, first } from '../../../node_modules/rxjs/operators';
import { Observable } from '../../../node_modules/rxjs';
import {MatTableDataSource, MatPaginator, MatSort} from '@angular/material';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit, AfterViewInit {
  products: any;
  displayedColumns = ['primary_image', 'product_id', 'name', 'status', 'categories', 'mrp', 'ssp', 'ymp'];
  dataSource: any;
  dataCount: any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private http:HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getProducts().subscribe(
      (data:any) => {this.products = (Object.values(data)); console.log(this.products); this.dataSource = new MatTableDataSource(this.products); this.dataCount = this.dataSource.length; this.dataSource.paginator = this.paginator; this.dataSource.sort = this.sort;}
    );
  }

  ngAfterViewInit() {

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  getProducts(){
    return this.http.get("http://localhost:18080/PMP-backend/api/products");
  }

  onRowClick(row){
    this.router.navigate([`/product/${row.product_id}`]);
  }

}
