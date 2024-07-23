import { Component, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown'; // Dropdown ekliyoruz
import { ConfirmationService, MenuItem } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { AuthService } from '../auth.service';
import { MenuComponent } from '../menu/menu.component';

interface Performance {
  id?: number;
  agentid: string;
  firstname: string;
  surname: string;
  begin: string;
  end: string;
  dateinfo: string;
  excuse: string;
  excusehours: number;
  timeout: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule, // Dropdown ekliyoruz
    SidebarModule,
    MenuModule,
    MenubarModule,
    AvatarModule,
    BadgeModule,
    MenuComponent,
  ],
  providers: [ConfirmationService],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('dt') dt: Table | undefined;

  displaySidebar: boolean = false;
  items: MenuItem[] = [];
  title = 'Performance Tracker';
  performances: Performance[] = [];
  filteredPerformances: Performance[] = [];
  performanceForm: FormGroup;
  searchValue: string = '';
  loading: boolean = true;
  displayAddDialog: boolean = false;
  displayUpdateDialog: boolean = false;
  selectedPerformance: Performance | null = null;
  selectedPerformances: Performance[] = [];
  fromDate: string = '';
  toDate: string = '';
  firstNames: { firstname: string }[] = []; // First Name dropdown seçenekleri için dizi
  selectedFirstName: { firstname: string } | null = null; // Seçilen First Name

  cols: any[] = [
    { field: 'begin', header: 'Begin' },
    { field: 'end', header: 'End' },
    { field: 'dateinfo', header: 'Date Info' },
    { field: 'excuse', header: 'Excuse' },
    { field: 'excusehours', header: 'Excuse Hours' },
    { field: 'timeout', header: 'Timeout' },
  ];

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.performanceForm = this.fb.group({
      // agentid, firstname ve surname alanlarını kaldırın
      begin: ['', Validators.required],
      end: ['', Validators.required],
      dateinfo: ['', Validators.required],
      excuse: [''],
      excusehours: [0, Validators.required],
      timeout: [0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.getPerformances();
  }

  getPerformances(): void {
    const agentId = this.authService.getAgentId();
    this.authService.getPerformances().subscribe({
      next: (data: Performance[]) => {
        this.performances = data.filter(
          (performance) => performance.agentid === agentId
        );
        this.filteredPerformances = this.performances; // Başlangıçta tüm performans verilerini göster
        this.loading = false;
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  filterByDate(): void {
    if (this.fromDate && this.toDate) {
      const from = new Date(this.fromDate);
      const to = new Date(this.toDate);

      this.filteredPerformances = this.performances.filter((performance) => {
        const date = new Date(performance.dateinfo);
        return date >= from && date <= to;
      });
    } else {
      this.filteredPerformances = this.performances;
    }
  }

  filterByFirstName(): void {
    if (this.selectedFirstName) {
      this.filteredPerformances = this.performances.filter(
        (performance) =>
          performance.firstname === this.selectedFirstName!.firstname
      );
    } else {
      this.filteredPerformances = this.performances;
    }
  }

  clearFilter(): void {
    this.fromDate = '';
    this.toDate = '';
    this.selectedFirstName = null;
    this.filteredPerformances = this.performances;
  }

  addPerformance(): void {
    if (this.performanceForm.valid) {
      const newPerformance = {
        ...this.performanceForm.value,
        agentid: this.authService.getAgentId(),
        firstname: this.authService.getName(),
        surname: this.authService.getSurname(),
      };
      this.authService.addPerformance(newPerformance).subscribe({
        next: (data) => {
          this.performances.push(data);
          this.filterByDate();
          this.performanceForm.reset();
          this.displayAddDialog = false;
        },
        error: (error) => console.error('There was an error!', error),
      });
    }
  }

  updatePerformance(): void {
    if (this.selectedPerformance && this.performanceForm.valid) {
      const updatedPerformance = {
        ...this.performanceForm.value,
        agentid: this.authService.getAgentId(),
        firstname: this.authService.getName(),
        surname: this.authService.getSurname(),
      };
      this.authService
        .updatePerformance(this.selectedPerformance.id!, updatedPerformance)
        .subscribe({
          next: (data) => {
            const index = this.performances.findIndex(
              (p) => p.id === this.selectedPerformance?.id
            );
            if (index !== -1) {
              this.performances[index] = data;
            }
            this.filterByDate();
            this.performanceForm.reset();
            this.selectedPerformance = null;
            this.displayUpdateDialog = false;
          },
          error: (error) => console.error('There was an error!', error),
        });
    }
  }

  editPerformance(performance: Performance): void {
    this.selectedPerformance = performance;
    this.performanceForm.patchValue(performance);
    this.displayUpdateDialog = true;
  }

  confirmDelete(performance: Performance): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this data?',
      header: 'Are You Sure?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deletePerformance(performance);
      },
      reject: () => {
        // No action needed
      },
    });
  }

  deletePerformance(performance: Performance): void {
    this.authService.deletePerformance(performance.id!).subscribe({
      next: () => {
        console.log('Deleted performance:', performance);
        this.performances = this.performances.filter(
          (p) => p.id !== performance.id
        );
        this.filterByDate(); // Performans silindiğinde filtreyi yeniden uygula
      },
      error: (error) => console.error('There was an error!', error),
    });
  }

  clear(dt: any) {
    dt.clear();
    this.searchValue = '';
  }

  applyFilterGlobal(event: Event, dt: any) {
    const inputElement = event.target as HTMLInputElement;
    dt.filterGlobal(inputElement.value, 'contains');
  }

  toggleSidebar() {
    this.displaySidebar = !this.displaySidebar;
  }

  onSidebarHide() {
    this.displaySidebar = false;
  }

  showAddDialog() {
    this.displayAddDialog = true;
  }

  hideAddDialog() {
    this.displayAddDialog = false;
  }

  hideUpdateDialog() {
    this.displayUpdateDialog = false;
    this.selectedPerformance = null;
    this.performanceForm.reset();
  }

  exportCSV() {
    if (this.dt) {
      this.dt.exportCSV();
    } else {
      console.error('Table component is not available.');
    }
  }
}
