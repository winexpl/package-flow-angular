import { Routes } from '@angular/router';
import { PackagesPageComponent } from './pages/packages-page/packages-page.component';

export const routes: Routes = [
    { path: 'packages', component: PackagesPageComponent, pathMatch: 'full' },
    { path: '**', redirectTo: 'packages' },
];
