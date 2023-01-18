import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baserUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  public saveUser(user: any) {
    return this.httpClient.post(`${baserUrl}/users/`, user);
  }
}
