import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpFormGroup!: FormGroup;

  constructor(private snack: MatSnackBar, private userService: UserService, 
    private formBuilder: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.signUpFormGroup = this.formBuilder.group({
      signupData: this.formBuilder.group({
        username: new FormControl(''),
        password: new FormControl(''),
        name: new FormControl(''),
        lastName: new FormControl(''),
        email: new FormControl(''),
        phone: new FormControl(''),
        enabled: new FormControl(true),
        profile: new FormControl('photo.png')
      })
    });
  }

  formSubmit() {
    let signupData = this.signUpFormGroup.controls['signupData'].value;
    if(signupData.username == '' || signupData.username == null){
      this.snack.open('El nombre de usuario es requerido !!','Aceptar',{
        duration : 3000,
        verticalPosition : 'bottom',
        horizontalPosition : 'center'
      });
      return;
    }

    this.userService.saveUser(signupData).subscribe(
      (data) => {
        console.log(data);
        //Swal.fire('Usuario guardado','Usuario registrado con éxito en el sistema', 'success');
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Usuario registrado con éxito en el sistema',
          showConfirmButton: true,
          willClose: () => {this.router.navigateByUrl('/login')}
        })
      },(error) => {
        console.log(error);
        this.snack.open('Ha ocurrido un error en el sistema !!','Aceptar',{
          duration : 3000
        });
      }
    );
  }

}
