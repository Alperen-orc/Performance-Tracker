import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { AuthService } from '../auth.service';
import { RouterModule, Router } from '@angular/router';
import { MenuModule } from 'primeng/menu'; // Eklenmesi gereken modül

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  standalone: true,
  imports: [
    SidebarModule,
    MenubarModule,
    ButtonModule,
    AvatarModule,
    CommonModule,
    MenuModule,
    RouterModule,
  ],
})
export class MenuComponent implements OnInit {
  @Input() items: MenuItem[] = [];
  @Input() name: string = '';
  @Input() surname: string = '';
  @Input() image: string = '';
  displaySidebar: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.initializeMenu();

    this.name = this.authService.getName();
    this.surname = this.authService.getSurname();
    this.image = this.authService.getImage();
  }

  initializeMenu(): void {
    const roles = this.authService.getRoles();

    this.items = [
      {
        label: 'Performance Entry',
        icon: 'pi pi-user-plus',
        routerLink: ['/dashboard'],
      },
    ];

    if (roles.includes('ADMIN')) {
      this.items.push({
        label: 'Report',
        icon: 'pi pi-file',
        routerLink: ['/report'],
      });
    }
  }

  toggleSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }

  onSidebarHide() {
    this.displaySidebar = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
