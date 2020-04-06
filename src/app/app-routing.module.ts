import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsListComponent } from './components/patients-list/patients-list.component';
import { CreatePatientComponent } from './components/patients/create-patient/create-patient.component';
import { ViewPatientComponent } from './components/view-patient/view-patient.component';


const routes: Routes = [
  { path: 'list', component: PatientsListComponent },
  { path: 'create', component: CreatePatientComponent },
  { path: 'edit/:id', component: CreatePatientComponent },
  { path: 'view/:id', component: ViewPatientComponent },
  { path: '', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
