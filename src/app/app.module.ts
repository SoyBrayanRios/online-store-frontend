import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { SideFilterComponent } from './components/side-filter/side-filter.component';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

import { NgbCollapseModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';

import { SignupComponent } from './components/signup/signup.component';
import { authInterceptorProviders } from './services/interceptors/auth.interceptor';
import { AdminComponent } from './components/panel/admin/admin.component';
import { UserComponent } from './components/panel/user/user.component'; 
import { AllGuard } from './services/guards/all.guard';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { DynamicHostDirective } from './directives/dynamic-host.directive';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './services/interceptors/loading.interceptor';
import { OrderOverviewComponent } from './components/order-overview/order-overview.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { CategoryCarouselComponent } from './components/category-carousel/category-carousel.component';


const routes: Routes = [
  {path: 'admin', component: AdminComponent, canActivate: [AllGuard]},
  {path: 'admin/order-list/test', component: OrderOverviewComponent, canActivate: [AllGuard]},
  //{path: 'admin/addresses', component: , canActivate: [AllGuard]},
  {path: 'admin/order-list', component: OrderListComponent, canActivate: [AllGuard]},
  {path: 'orders', component: OrderListComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'cart-details', component: CartDetailsComponent, canActivate: [AllGuard]},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: SideFilterComponent},
  {path: 'category/:id', component: SideFilterComponent},
  {path: 'category', component: SideFilterComponent},
  {path: 'products', component: SideFilterComponent},
  {path: 'home', component: MainPageComponent, canActivate: [AllGuard]},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home', pathMatch: 'full'}
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
    UserComponent,
    SidenavComponent,
    OrderListComponent,
    DynamicHostDirective,
    AccountInfoComponent,
    SpinnerComponent,
    OrderOverviewComponent,
    MainPageComponent,
    CategoryCarouselComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbCollapseModule,
    FontAwesomeModule,
    NgbModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatBadgeModule,
    MatIconModule
  ],
  providers: [authInterceptorProviders,
    {
      provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }