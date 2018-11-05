import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges {
  loggedIn = false;
  home = "/login";
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('token')){
      this.loggedIn = true;
      this.home="/list-product";
    }
    else if(!localStorage.getItem('token')){
      this.loggedIn = false;
      this.home="/login";
    }
  }

  ngOnChanges() {
    if(localStorage.getItem('token')){
      this.loggedIn = true;
      this.home="/list-product";
    }
    else if(!localStorage.getItem('token')){
      this.loggedIn = false;
        this.home="/login";
    }
  }

}
