import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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

const routes: Routes = [
  {path: 'cart-details', component: CartDetailsComponent},
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
    CartDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FontAwesomeModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }