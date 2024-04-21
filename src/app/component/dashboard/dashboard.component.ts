import { HeaderComponent } from './../header/header.component';
import { Component } from '@angular/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  // imports: [],
  imports: [MatButtonModule, MatMenuModule, HeaderComponent],

  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
