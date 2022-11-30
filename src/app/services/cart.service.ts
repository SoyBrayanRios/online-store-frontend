import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new Subject<number>();
  totalQuantity: Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem: CartItem) {
    //Chack if we already have the item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      //Find the item in the cart based on item id
      for (let cartItem of this.cartItems) {
        if (cartItem.id === theCartItem.id) {
          existingCartItem = cartItem;
          break;
        }
      }
      //Check if we found it
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //Increment the quantity
      existingCartItem.quantity++;
    } else {
      //Just add the item to array
      this.cartItems.push(theCartItem);
    }

    //Compute cart total price and total quantity
    this.computeCartTotals();

  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity;
    }
    //Publish the new values to all subscribers
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
      console.log("Content of the cart");
      for (let tempCartitem of this.cartItems) {
        const subTotalPrice = tempCartitem.quantity * tempCartitem.unitPrice;
        console.log(`Name: ${tempCartitem.name}, quantity: ${tempCartitem.quantity},
        unitPrice: ${tempCartitem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
      }
      console.log(`Total Price: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`);
      
  }
}
