import { Component, OnInit } from '@angular/core';
import { IPatient } from 'src/app/models/patient.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-view-patient',
  templateUrl: './view-patient.component.html',
  styleUrls: ['./view-patient.component.scss']
})
export class ViewPatientComponent implements OnInit {

  patient: IPatient;
  constructor(private route: ActivatedRoute, private _router: Router, private _patientService: PatientService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this._patientService.getPatient(id).subscribe((pat) => {
      this.patient = pat;
    });
  }

}
