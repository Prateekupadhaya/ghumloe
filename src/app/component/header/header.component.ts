import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { LoginComponent } from '../../login/login.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatDialogModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public dialog: MatDialog) {}

  // registerUser() {
  //   const dialogRef = this.dialog.open(RegistrationComponent, {
  //     width: '600',
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }

  openDialog(){
    const dialogRef = this.dialog.open(LoginComponent, {
      height: '600px',
      width: '500px',
    });
  }
}
