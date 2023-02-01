import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faTachographDigital } from '@fortawesome/free-solid-svg-icons';
import { CartItem } from 'src/app/common/cart-item';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup!: FormGroup;

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService,
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
        docType: new FormControl(''),
        docNumber: new FormControl('', [Validators.required, Validators.minLength(5)]),
        email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
      }),
      shippingAddress: this.formBuilder.group({
        mainAddress: [''],
        complement: [''],
        department: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      billingAddress: this.formBuilder.group({
        mainAddress: [''],
        complement: [''],
        department: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      })
    });
  }

  reviewCartDetails() {
    //Subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    //Subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }

  get firstName() { return this.checkoutFormGroup.get('customer.firstName'); }
  get lastName() { return this.checkoutFormGroup.get('customer.lastName'); }
  get docType() { return this.checkoutFormGroup.get('customer.docType'); }
  get docNumber() { return this.checkoutFormGroup.get('customer.docNumber'); }
  get email() { return this.checkoutFormGroup.get('customer.email'); }
  get phone() { return this.checkoutFormGroup.get('customer.phone'); }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
        .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }
  }


  onSubmit() {
    console.log("Handling submit button");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    //Set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    //Get cart items
    const cartItems = this.cartService.cartItems;
    //Create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    //Set up purchase
    let user = JSON.parse(localStorage.getItem('user')!).id;
    //Set up purchase
    let purchase = new Purchase();
    //Populate purchase - customer
    purchase.customer = this.checkoutFormGroup.controls['customer'].value;
    //Populate purchase - user
    purchase.userId = +user!;
    //Populate purchase - shipping address
    purchase.shippingAddress = this.checkoutFormGroup.controls['shippingAddress'].value;
    //Populate purchase - billing address
    purchase.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    //Populate purchase - order and orderItems
    purchase.order = order;
    purchase.orderItems = orderItems;
    //Call REST API via the CheckoutService
    this.checkoutService.placeOrder(purchase).subscribe({
      next: response => {
        Swal.fire(
          'Pedido realizado!',
          `La orden ha sido recibida.\nNumero de order: ${response.orderTrackingNumber}`,
          'success'
        )
        //Reset cart
        this.resetCart();
      },
      error: err => {
        Swal.fire(
          'Error al registrar el pedido!',
          `Hubo un error al crear la orden: ${err.message}`,
          'error'
        )
      }
    });
  }

  resetCart() {
    //Reset cart data
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    //Reset form data
    this.checkoutFormGroup.reset();
    //Navigate  back to the products page
    this.router.navigateByUrl("/products");
  }

}
