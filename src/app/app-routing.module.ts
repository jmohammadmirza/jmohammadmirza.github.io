import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QnAFormComponent } from './qn-a-form/qn-a-form.component';
import { HomrComponent } from './homr/homr.component';
import { TableComponent } from './table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: HomrComponent },
  { path: 'form', component: QnAFormComponent },
  { path: 'data', component: TableComponent },
  { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
