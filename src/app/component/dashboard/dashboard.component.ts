import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { Observable, Observer } from 'rxjs';
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
  asyncTabs: Observable<any[]>;
  departureDate = new FormControl();
  returnDate = new FormControl();

  constructor() {
    this.asyncTabs = new Observable((observer: Observer<any[]>) => {
      setTimeout(() => {
        observer.next([
          { id: 1, label: 'Flight' },
          { id: 2, label: 'Hotel', content: 'Content 2' },
          { id: 3, label: 'Plan a Trip', content: 'Content 3' },
          { id: 4, label: 'Activity', content: 'Content 1' },
          { id: 5, label: 'Transfers', content: 'Content 2' },
          { id: 6, label: 'Intercity Cab', content: 'Content 3' },
        ]);
      }, 1000);
    });
  }
}
