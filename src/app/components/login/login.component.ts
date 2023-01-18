import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginFormGroup!: FormGroup;

  constructor(private snack:MatSnackBar, private loginService:LoginService, private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      loginData: this.formBuilder.group({
        username: new FormControl(''),
        password: new FormControl('')
      })
    });
  }

  formSubmit(){
    let loginData = this.loginFormGroup.controls['loginData'].value;
    if(loginData.username.trim() == '' || loginData.username.trim() == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration:3000
      })
      return;
    }

    if(loginData.password.trim() == '' || loginData.password.trim() == null){
      this.snack.open('La contraseña es requerida !!','Aceptar',{
        duration:3000
      })
      return;
    }

    this.loginService.generateToken(loginData).subscribe(
      (data: any) => {
        this.loginService.loginUser(data.token);
        this.loginService.getCurrentUser().subscribe((user: any) => {
          this.loginService.setUser(user);
          //this.loginService.setGlobalUsername();
          console.log(user);
          
          if(this.loginService.getUserRole() == 'ADMIN'){
            //dashboard admin
            //window.location.href = '/admin';
            this.router.navigate(['admin']);
            this.loginService.loginStatusSubject.next(true);
          }
          else if(this.loginService.getUserRole() == 'STANDARD'){
            //user dashboard
            //window.location.href = '/user-dashboard';
            this.router.navigate(['user']);
            this.loginService.loginStatusSubject.next(true);
          } else{
            this.loginService.logout();
          }
        })
      },(error) => {
        console.log(error);
        this.snack.open('Detalles inválidos , vuelva a intentar !!','Aceptar',{
          duration:3000
        })
      }
    );
  }

}
