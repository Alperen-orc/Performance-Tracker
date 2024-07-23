import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { HttpClientModule } from '@angular/common/http'; // HttpClientModule eklendi
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, HttpClientModule], // HttpClientModule eklendi
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Performance Tracker';
  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: ['/'],
      },
      {
        label: 'Dashboard',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: ['/dashboard'],
      },
      {
        label: 'Reports',
        icon: 'pi pi-fw pi-file',
        routerLink: ['/reports'],
      },
      {
        label: 'Login',
        icon: 'pi pi-fw pi-sign-in',
        routerLink: ['/login'],
      },
      {
        label: 'Signup',
        icon: 'pi pi-fw pi-user-plus',
        routerLink: ['/signup'],
      },
    ];
  }
}
