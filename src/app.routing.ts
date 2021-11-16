import { RouterModule, Routes } from '@angular/router';
import { DatasetComponent } from "./dataset";
import { FlowchartComponent } from "./flowchart";

export const AppRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: FlowchartComponent },
  { path: 'data', component: DatasetComponent }
];

export const ROUTING = RouterModule.forRoot(AppRoutes, { useHash: true, relativeLinkResolution: 'legacy' });
