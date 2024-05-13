import { Component } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-detail',
  standalone: true,
  imports: [
    MatSliderModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatMomentDateModule,
    MatDatepickerModule,
    ReactiveFormsModule
  ],
  templateUrl: './flight-detail.component.html',
  styleUrl: './flight-detail.component.css',
})
export class FlightDetailComponent {
  departureDate = new FormControl();
  returnDate = new FormControl();
  childrenOnTravel: number = 0;
  adultSliderValue: number = 0; // Declare adultSliderValue property and assign it a default value
  // Declare other properties and methods as needed
  adultsOnTravel: number = 0;
  infantsOnTravel:number = 0;
  selectedTravelClass:number = 0;
  durationInSeconds:number = 0;

  openDialogues: boolean = false;
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.openDialogues = !this.openDialogues;
    console.log('openDialogues', this.openDialogues);

   
  
  }

}
