import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    MatButtonModule,
    MatMenuModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
  hide = true;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog
  ) {}

  openDialog(event: MouseEvent) {
    event.preventDefault(); // Prevent the default behavior of anchor element
    const dialogRef = this.dialog.open(RegistrationComponent, {
      height: '100%',
      width: '45%',
    });
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  updateErrorMessage() {
    const emailControl = this.loginForm.get('email');
    if (emailControl) {
      if (emailControl.hasError('required')) {
        this.errorMessage = 'You must enter a value';
      } else if (emailControl.hasError('email')) {
        this.errorMessage = 'Not a valid email';
      } else {
        this.errorMessage = '';
      }
    }
  }

  login() {
    if (this.loginForm.valid) {
      const emailControl = this.loginForm.get('email');
      const passwordControl = this.loginForm.get('password');

      if (emailControl && passwordControl) {
        const email = emailControl.value;
        const password = passwordControl.value;
        console.log('email', email);
        console.log('password', password);
      }
    }
  }

  navigateToSignUp() {
    // this.router.navigate(["/register"]);
  }

  forgetPassword() {
    // this.router.navigate(["/forgetPassword"]);
  }
}
