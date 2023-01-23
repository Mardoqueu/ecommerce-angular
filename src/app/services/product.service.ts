import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  cartData= new EventEmitter<product[]| []>()
  constructor(private http:HttpClient) { }
  addProduct(data:product){
   return this.http.post('https://fake-product-api-mdq.herokuapp.com/products', data);
  }
  productList(){
    return this.http.get<product[]>('https://fake-product-api-mdq.herokuapp.com/products')
  }
  
  deleteProduct(id:number){
    return this.http.delete(`https://fake-product-api-mdq.herokuapp.com/products/${id}`)
  }

  getProduct(id:string){
    return this.http.get<product>(`https://fake-product-api-mdq.herokuapp.com/products/${id}`);
  }

  updateProduct(product:product){
    return this.http.put<product>(`https://fake-product-api-mdq.herokuapp.com/products/${product.id}`, product);
  }
  popularProducts(){
    return this.http.get<product[]>(`https://fake-product-api-mdq.herokuapp.com/products?_limit=4`);
  }

  trendyProducts(){
    return this.http.get<product[]>(`https://fake-product-api-mdq.herokuapp.com/products?_limit=10`);
  }

  searchProduct(query:string){
    return this.http.get<product[]>(`https://fake-product-api-mdq.herokuapp.com/products?_q=${query}`);
  } 

  localAddToCart(data:product){
    let cartData =[];
    let localCart= localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);
    }else{
     cartData = JSON.parse(localCart);
     cartData.push(data);
     localStorage.setItem('localCart',JSON.stringify(cartData));
     this.cartData.emit(cartData);
    }
   }

   removeItemFromCart(productId:number){
    let cartData= localStorage.getItem('localCart');
    if(cartData){
      let items:product[] =JSON.parse(cartData);
      items= items.filter((item:product)=>productId!==item.id)
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
   }

   addToCart(cartData:cart){
    return this.http.post('https://fake-product-api-mdq.herokuapp.com/cart',cartData);
  }

  getCartList(userId: number) {
    return this.http
      .get<product[]>('https://fake-product-api-mdq.herokuapp.com/cart?userId=' + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeToCart(cartId: number) {
    return this.http.delete('https://fake-product-api-mdq.herokuapp.com/cart/' + cartId);
  }

  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('https://fake-product-api-mdq.herokuapp.com/cart?userId=' + userData.id);
  }

  orderNow(data:order){
    return this.http.post('https://fake-product-api-mdq.herokuapp.com/orders',data);
  }
  orderList(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('https://fake-product-api-mdq.herokuapp.com/orders?userId=' + userData.id);
  }
  deleteCartItems(cartId: number) {
    return this.http.delete('https://fake-product-api-mdq.herokuapp.com/cart/' + cartId).subscribe((result) => {
      this.cartData.emit([]);
    })
  }
  cancelOrder(orderId:number){
    return this.http.delete('https://fake-product-api-mdq.herokuapp.com/orders/'+orderId)

  }
}