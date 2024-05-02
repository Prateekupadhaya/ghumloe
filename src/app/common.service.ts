import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }

  login(email_id: string, password: string, account_type: string): Observable<any> {
    const url = `${environment.api_base_url}/login`;

    // Construct the request body with additional parameters
    const requestBody = {
      email_id: email_id,
      password: password,
      account_type: account_type
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any[]>(url, requestBody, { headers });
  }

  preComponentDestroyTasks(subscriptions: any, dialog?: MatDialog): void {

    if (subscriptions && subscriptions.length) {
      subscriptions.forEach((subscription: any) => {
        if (subscription) {
          subscription.unsubscribe();
        }
      });
    }

    if (dialog) {
      dialog.closeAll();
    }
  }
}
