import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  role: string = "STANDARD";
  username: string = "";
  constructor(public loginService: LoginService) { }
  
  ngOnInit(): void {
    this.updateRole();
    this.updateUsername();
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

}
