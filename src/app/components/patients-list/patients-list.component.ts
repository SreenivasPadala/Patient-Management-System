import { Component, OnInit } from '@angular/core';
import { PatientService } from 'src/app/shared/patient.service';
import { IPatient } from 'src/app/models/patient.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss']
})
export class PatientsListComponent implements OnInit {
  patients: IPatient[];
  loading = false;

  constructor(private patientService : PatientService,
              private _router : Router) { }

  ngOnInit(): void {
    this.getPatients();
  }

  getPatients() {
    this.patientService.getPatients().subscribe(
      (patientList) => {
        if (patientList) {
          this.loading = true;
          this.patients = patientList
        }
      },
      (err) => console.log(err)
    );
  }

  EditPatient(patientId: number) {
    this._router.navigate(['/edit', patientId]);
  }
  delete(id: number) {
   this.patientService.deletePatient(id).subscribe((list)=> {
    this.getPatients();
   });
  }
   viewData(patientId: number) {
    this._router.navigate(['/view', patientId]);
  }
   
  

}
