import { Component, OnInit } from '@angular/core';
import { faRightFromBracket, faCartShopping, faUserCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from './common/product-category';
import { ProductService } from './services/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'online-store-frontend';
  faRightFromBracket = faRightFromBracket;
  faCartShopping = faCartShopping;
  faUserCircle = faUserCircle;
  faSearch = faSearch;

  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService) {

  }

  ngOnInit(): void {
      this.listProductCategories();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }
}