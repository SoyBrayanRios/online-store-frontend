import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public username = new BehaviorSubject<string>("");
  public role = new BehaviorSubject<string>("STANDARD");
  public loginStatusSubject = new Subject<boolean>();

  constructor(private http:HttpClient) { }

  //generamos el token
  public generateToken(loginData:any) {
    return this.http.post(`${baserUrl}/generate-token`, loginData);
  }

  public getCurrentUser(){
    return this.http.get(`${baserUrl}/current-user`);
  }

  //iniciamos sesión y establecemos el token en el localStorage
  public loginUser(token:any){
    localStorage.setItem('token', JSON.stringify(token));
    return true;
  }

  public isLoggedIn(){
    let tokenStr = localStorage.getItem('token');
    let userStr = localStorage.getItem('user');
    if(tokenStr == undefined || tokenStr == '' || tokenStr == null){
      return false;
    }else{
      if (userStr != null) {
        this.username.next(JSON.parse(userStr).name);
        this.role.next(JSON.parse(userStr).authorities[0].authority);
      }
      return true;
    }
  }

  //cerranis sesion y eliminamos el token del localStorage
  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  //obtenemos el token
  public getToken(){
    let tokenStr = localStorage.getItem('token');
    if (tokenStr != null) {
      return JSON.parse(tokenStr);
    } else {
      return null;
    }
  }

  public setUser(user:any){
    localStorage.setItem('user', JSON.stringify(user));
    this.role.next(user.authorities[0].authority);
    this.username.next(user.name);
  }

  public getUser(){
    let userStr = localStorage.getItem('user');
    if(userStr != null){
      return JSON.parse(userStr);
    }else{
      this.logout();
      return null;
    }
  }

  public getUserRole(){
    let user = this.getUser();
    return user.authorities[0].authority;
  }

}
