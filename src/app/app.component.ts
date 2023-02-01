import { Component, OnInit } from '@angular/core';
import { faBars, faRightFromBracket, faCartShopping, faUserCircle, faSearch, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ProductCategory } from './common/product-category';
import { LoginService } from './services/login.service';
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
  faArrowRightFromBracket = faArrowRightFromBracket;
  faBars = faBars;
  isMenuCollapsed = true;

  username: string = "";
  role: string = "STANDARD";
  productCategories: ProductCategory[] = [];

  constructor(private productService: ProductService,
    public loginService: LoginService) {
  }

  ngOnInit(): void {
    this.updateRole();
    this.updateUsername();
    this.listProductCategories();
  }

  updateRole() {
    this.loginService.role.subscribe(
      data => this.role = data
    );
  }

  updateUsername() {
    this.loginService.username.subscribe(
      data => this.username = data
    );
  }

  public logout() {
    this.loginService.logout();
    window.location.reload();
  }

  listProductCategories() {
    this.productService.getProductCategories().subscribe(
      data => {
        this.productCategories = data;
      }
    );
  }
}