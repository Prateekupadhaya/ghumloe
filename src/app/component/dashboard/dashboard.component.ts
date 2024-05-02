import { HeaderComponent } from './../header/header.component';
import { Component, ElementRef, HostListener } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Observable, Observer, Subject, debounceTime } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio'; // Import MatRadioModule
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // imports: [],
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatMomentDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatRadioModule,
    MatButtonModule,
    MatMenuModule,
    HeaderComponent,
    MatTabsModule,
    AsyncPipe,
  ],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  private searchSubject = new Subject<any>();

  asyncTabs: Observable<any[]>;
  departureDate = new FormControl();
  returnDate = new FormControl({value: '', disabled: true});
  searchQuery: string = '';
  destinationQuery: string = '';
  startLocation: any;
  isStartLocationTouched: boolean = false;
  selectedStartLocation: any;
  selectedDestinationLocation: any;
  isdestinationLocationTouched: boolean = false;
  selectedTripType: string = 'one-way';
  isReturnDateDisabled: boolean = true;
  destinationLocation: any;

  constructor(private dashboardService: DashboardService, private elementRef: ElementRef) {
    this.asyncTabs = new Observable((observer: Observer<any[]>) => {
      setTimeout(() => {
        observer.next([
          {id: 1, label: 'assets/images/plane.png', content: 'flight'},
          {id: 2, label: 'assets/images/hotel-sign.png', content: 'hotel'},
          {id: 3, label: 'assets/images/travel-luggage.png', content: 'plan a trip'},
          {id: 4, label: 'assets/images/paragliding.png', content: 'activity'},
          {id: 5, label: 'assets/images/truck.png', content: 'transfers'},
          {id: 6, label: 'assets/images/taxi (1).png', content: 'Intercity Cab'},
        ]);
      }, 1000);
    });

    this.searchSubject.pipe(debounceTime(500)).subscribe((data) => {
      this.getAirportLocation(data.searchQuery, data.location);
    });
  }

  tripTypeChanged(tripType: string) {
    if(tripType === 'round-trip') {
      this.returnDate.enable();
    }else {
      this.returnDate.disable();
    }
  }


  onSearchFlight(event: any, location:string) {
    console.log('event', event.target.value);
    const searchQuery = event.target.value.trim();
    const data = {
      searchQuery,
      location
    }
    if (searchQuery !== '' && location == 'startLocation') {
      this.isStartLocationTouched = true;
      this.searchSubject.next(data);
    }
    if (searchQuery !== '' && location == 'destinationLocation') {
      this.isdestinationLocationTouched = true;
      this.searchSubject.next(data);
    }
  }

  getAirportLocation(query: string, location: string): void {
    this.dashboardService.searchAirport(query).subscribe(
      (data) => {
        if(location === 'startLocation'){
          this.startLocation = data;
        } else{
          this.destinationLocation = data;
        }
      },
      (error) => {
        console.error("Error calling search API:", error);
      }
    );
  }

  selectAirport(event: any, location:any) {
    console.log('airport selected', event)
    if(location === 'startLocation') {
      this.searchQuery = event.name;
      this.selectedStartLocation = event;
      this.isStartLocationTouched = false;
    }
    if(location === 'destination') {
      this.destinationQuery = event.name;
      this.selectedDestinationLocation = event;
      this.isdestinationLocationTouched = false;
    }
  }

  searchFlights() {
    const departureDateValue = this.departureDate.value ? this.departureDate.value.format('YYYY-MM-DD') : '';
    // const returnDateValue = this.returnDate.value ? this.returnDate.value.format('YYYY-MM-DD') : '';
    const adults = 5;
    try {
      this.dashboardService.searchFlight(this.selectedStartLocation.iataCode, this.selectedDestinationLocation.iataCode,
        adults, 10, departureDateValue).subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.error("Error calling searchFlight API:", error);
      });
    } catch (error) {
      console.log(error);
    }
  }
}
