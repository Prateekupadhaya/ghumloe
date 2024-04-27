import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {merge} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatDialogModule,MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule,MatIconModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
    email = new FormControl('', [Validators.required, Validators.email]);
  
    errorMessage = '';
  
    constructor() {
      merge(this.email.statusChanges, this.email.valueChanges)
        .pipe(takeUntilDestroyed())
        .subscribe(() => this.updateErrorMessage());
    }
  
    updateErrorMessage() {
      if (this.email.hasError('required')) {
        this.errorMessage = 'You must enter a value';
      } else if (this.email.hasError('email')) {
        this.errorMessage = 'Not a valid email';
      } else {
        this.errorMessage = '';
      }
    }
  }

