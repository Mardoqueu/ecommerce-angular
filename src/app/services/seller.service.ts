import { EventEmitter, Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLoginError  = new EventEmitter<boolean>(false);

  constructor(private http:HttpClient, private router:Router) { }
  userSignUp(data:signUp){
    this.http.post("https://fake-product-api-mdq.herokuapp.com/seller", 
    data, 
    {observe:'response'}).subscribe((result) => {
        console.warn()
        if (result) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller-home']);
        }
    });
  }
  reloadSeller(){
    if(localStorage.getItem('seller')){
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller-home']);
    }
  }
  userLogin(data:login){
    this.http.get(`https://fake-product-api-mdq.herokuapp.com/seller?email=${data.email}&password=${data.password}`,
    {observe: 'response'}).subscribe((result:any)=>{
      if(result && result.body && result.body.length===1){
        this.isLoginError.emit(false);
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.router.navigate(['seller-home']);  
      }else{
        console.warn('login failed');
        this.isLoginError.emit(true);
      }
    })
  }
}
