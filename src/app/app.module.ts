import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignupComponent } from './components/signup/signup.component';
import { authInterceptorProviders } from './services/interceptors/auth.interceptor';
import { AdminComponent } from './components/panel/admin/admin.component';
import { UserComponent } from './components/panel/user/user.component';
import { AdminGuard } from './services/guards/admin.guard';
import { StandardGuard } from './services/guards/standard.guard';
import { AllGuard } from './services/guards/all.guard';


const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {path: 'user', component: UserComponent, canActivate: [StandardGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'cart-details', component: CartDetailsComponent, canActivate: [AllGuard]},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: SideFilterComponent},
  {path: 'category/:id', component: SideFilterComponent},
  {path: 'category', component: SideFilterComponent},
  {path: 'products', component: SideFilterComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    SideFilterComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    AdminComponent,
    UserComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }