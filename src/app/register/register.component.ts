import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
isSubmitting = false;
errors: Object = {};

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.registerForm = this.fb.group({
      companyname: ['', Validators.required],
      ownername: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      telephone: ['', Validators.required],
      gstnumber: ['', Validators.required],
      password: ['', Validators.required],
      confirmpassword: ['', Validators.required]
    });
  }

  ngOnInit() {

  }

  submitForm(){
    if(this.registerForm.invalid){
      alert("Please fill all the fields");
      return;
    }

    if(this.registerForm.value.password != this.registerForm.value.confirmpassword){
      alert("Password and Confirm Password does not match");
      return;
    }


    let jsonToBeSent = {
       "company_name": this.registerForm.value.companyname,
       "owner_name": this.registerForm.value.ownername,
       "address": this.registerForm.value.address,
       "email": this.registerForm.value.email,
       "telephone": this.registerForm.value.telephone.toString(),
       "gst_number": this.registerForm.value.gstnumber,
       "password": this.registerForm.value.password,
       "status": "NEED_APPROVAL"
        }

    this.http.post<any>("http://localhost:18080/PMP-backend/api/sellers", jsonToBeSent).subscribe((data:any) => {this.router.navigate(['/login']); });
  }

}
