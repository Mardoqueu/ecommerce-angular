import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  menuType:string = 'default';
  sellerName:string="";
  searchResult:undefined|product[]
  constructor(private route: Router, private product:ProductService) {}

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
            let sellerStore=localStorage.getItem('seller');
            let sellerData=sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName=sellerData.name;
            this.menuType = 'seller';
        } else {
          this.menuType = 'default';
        }
      }
    });
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate(['/']);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      console.warn(element.value)
      this.product.searchProduct(element.value).subscribe((result)=>{
        console.warn(result);
        if(result.length > 5){
          result.length=length;
        }
        this.searchResult=result;
      })
    }
  }
  hideSearch(){
    this.searchResult=undefined;
  }

  redirectToDetails(id:number){
    this.route.navigate(['/details/'+id]);
  }
  submitSearch(value:string){
    console.warn(value)
    this.route.navigate([`search/${value}`])
  }


}
