import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpClientModule } from "@angular/common/http";
import { BehaviorSubject, Observable, catchError, filter, map, switchMap, take } from 'rxjs';
import { environment } from '../../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  accessToken$: Observable<string> = this.accessTokenSubject.asObservable();

  constructor(private http: HttpClient) {
    // this.refreshToken();
  }

  // private refreshToken() {
  //   // If access token is already expired or not fetched yet
  //   if (!this.accessTokenSubject.value) {
  //     this.getAccessToken().subscribe(token => {
  //       this.accessTokenSubject.next(token);
  //     });
  //   } else {
  //     // Fetch new token only if the current token is expired
  //     this.accessToken$.pipe(
  //       filter(token => !token), // Wait for token to expire
  //       take(1), // Take only once
  //       switchMap(() => this.getAccessToken()), // Fetch new token
  //       catchError(error => {
  //         // Handle error in fetching token
  //         console.error('Error refreshing token:', error);
  //         return [];
  //       })
  //     ).subscribe(token => {
  //       this.accessTokenSubject.next(token);
  //     });
  //   }
  // }

  // private getAccessToken(): Observable<string> {
  //   const clientId = environment.amadus_api_key;
  //   const clientSecret = environment.amadus_api_secret;

  //   // Construct the request body to obtain the access token
  //   const body = new HttpParams()
  //     .set('grant_type', 'client_credentials')
  //     .set('client_id', clientId)
  //     .set('client_secret', clientSecret);

  //   // Make a POST request to the endpoint provided by the third-party API to obtain the access token
  //   const headers = new HttpHeaders()
  //     .set('Content-Type', 'application/x-www-form-urlencoded');

  //   return this.http.post<any>(`${environment.amadus_token_endpoint}`, body.toString(), { headers }).pipe(
  //     map(response => response.access_token) // Assuming the response contains the access token
  //   );
  // }

  // searchFlights(subType: string, keyword: string): Observable<any> {
  //   return this.accessToken$.pipe(
  //     filter(token => !!token), // Ensure token is available
  //     take(1), // Take only once
  //     switchMap(token => {
  //       // Constructing the URL with query parameters
  //       const url = `${environment.amadus_api_base_url}/reference-data/locations`;

  //       // Setting up query parameters
  //       const params = new HttpParams()
  //         .set('subType', subType)
  //         .set('keyword', keyword)
  //         .set('page[limit]', '10')
  //         .set('page[offset]', '0')
  //         .set('sort', 'analytics.travelers.score')
  //         .set('view', 'FULL');

  //       // Setting up headers with authorization token
  //       const headers = new HttpHeaders()
  //         .set('Content-Type', 'application/json')
  //         .set('Authorization', `Bearer ${token}`);

  //       // Making the HTTP GET request with the constructed URL, query parameters, and headers
  //       return this.http.get<any[]>(url, { params, headers });
  //     })
  //   );
  // }

  searchAirport(location: string): Observable<any> {
    const url = 'https://nsa3c3ywm6.execute-api.us-east-1.amazonaws.com/dev/fetch_airport';

    const params = new HttpParams().set('location', location);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get<any[]>(url, { params, headers });
  }

}
