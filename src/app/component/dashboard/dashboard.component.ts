import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { Observable, Observer } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
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
  imports: [CommonModule, MatCardModule, MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatMomentDateModule, MatDatepickerModule, MatIconModule, MatRadioModule, MatButtonModule, MatMenuModule, HeaderComponent, MatTabsModule, AsyncPipe],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  asyncTabs: Observable<any[]>;
  departureDate = new FormControl();
  returnDate = new FormControl();
  searchQuery: string = '';
  destinationQuery: string = '';
  airports: any;

  constructor(private dashboardService: DashboardService) {
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
  }

  onSearchFlight(event?: any) {
    console.log('event', event.target.value);
    const serachQuery = event.target.value.trim();
    if (serachQuery !== '') {
      this.getFlight(serachQuery);
    }
  }

  getFlight(query: string): void {
    this.dashboardService.searchFlights('CITY', query).subscribe(
      (data) => {
        console.log("Search API response:", data.data);
        this.airports = data.data;
      },
      (error) => {
        console.error("Error calling search API:", error);
      }
    );
  }
}
