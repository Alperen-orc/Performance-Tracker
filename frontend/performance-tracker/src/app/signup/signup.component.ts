import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  username: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  agentid: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.authService
      .signup(this.username, this.password, this.name, this.surname,this.agentid)
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Signup error:', error);
          alert('An error occurred during signup. Please try again.');
        },
      });
  }
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
