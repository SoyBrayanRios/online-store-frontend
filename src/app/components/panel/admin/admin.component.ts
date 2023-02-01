import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { DynamicHostDirective } from 'src/app/directives/dynamic-host.directive';
import { LoginService } from 'src/app/services/login.service';
import { AccountInfoComponent } from '../../account-info/account-info.component';
import { OrderListComponent } from '../../order-list/order-list.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {

  @ViewChild (DynamicHostDirective) public dynamicHost!: DynamicHostDirective;

  role: string = "STANDARD";
  username: string = "";
  constructor(public loginService: LoginService) { }
  
  ngOnInit(): void {
    this.updateRole();
    this.updateUsername();
  }

  ngAfterViewInit(): void {
    this.dynamicHost.viewContainerRef.clear();
    this.createComponent('personal-info');
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

  public createComponent(component: string): void {
    this.dynamicHost.viewContainerRef.clear();
    switch (component) {
      case "order-list":
        this.dynamicHost.viewContainerRef.createComponent(OrderListComponent); break;
      case "personal-info":
        this.dynamicHost.viewContainerRef.createComponent(AccountInfoComponent); break;
      case "addresses":
        this.dynamicHost.viewContainerRef.createComponent(OrderListComponent); break;
      default:
        this.dynamicHost.viewContainerRef.createComponent(OrderListComponent); break;
    }
  }

}
