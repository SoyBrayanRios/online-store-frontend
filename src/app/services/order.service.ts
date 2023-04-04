import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient: HttpClient) { }

  getOrdersByUser(userId: number): Observable<any> {
    const searchUrl = `${this.baseUrl}/${userId}`;
    return this.httpClient.get<any>(searchUrl);
  }
}
