import { Component,ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
loading = false;
submitted = false;
public readonly siteKey = '6LcvoUgUAAAAAJJbhcXvLn3KgG-pyULLusaU4mL1';

public captchaIsLoaded = false;
public captchaSuccess = false;
public captchaIsExpired = false;
public captchaResponse?: string;

public theme: 'light' | 'dark' = 'light';
public size: 'compact' | 'normal' = 'normal';
public lang = 'en';
public type: 'image' | 'audio';

  constructor(
  private cdr: ChangeDetectorRef,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private http: HttpClient
) { }

  ngOnInit() {

    if(localStorage.getItem('token')){
      this.router.navigate(["/list-product"]);
    }
    this.loginForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required],
        recaptcha: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }

      let jsonToBeSent = {
        "email": this.loginForm.value.email,
        "password": this.loginForm.value.password
      }

      console.log(this.loginForm.value);
      this.http.post<any>("http://localhost:18080/PMP-backend/api/sellers/login", jsonToBeSent).subscribe((data:any) => {localStorage.setItem("token", data.token); this.router.navigate(["/list-product"]);});
    }

    handleSuccess(captchaResponse: string): void {
    this.captchaSuccess = true;
    this.captchaResponse = captchaResponse;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleLoad(): void {
    this.captchaIsLoaded = true;
    this.captchaIsExpired = false;
    this.cdr.detectChanges();
  }

  handleExpire(): void {
    this.captchaSuccess = false;
    this.captchaIsExpired = true;
    this.cdr.detectChanges();
  }
}
