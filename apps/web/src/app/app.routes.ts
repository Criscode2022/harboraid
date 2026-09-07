import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { ShellComponent } from './pages/shell.component';
import { DashboardComponent } from './pages/dashboard.component';
import { InventoryPageComponent } from './pages/inventory.component';
import { RequestsPageComponent } from './pages/requests.component';
import { ShiftsPageComponent } from './pages/shifts.component';
import { authGuard } from './core/auth.guard';
export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: ShellComponent, canActivate: [authGuard], children: [
    { path: '', component: DashboardComponent },
    { path: 'inventory', component: InventoryPageComponent },
    { path: 'requests', component: RequestsPageComponent },
    { path: 'shifts', component: ShiftsPageComponent },
  ]},
];
