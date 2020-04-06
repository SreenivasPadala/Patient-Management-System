import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { IPatient } from 'src/app/models/patient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/shared/patient.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent implements OnInit {

  patientForm: FormGroup;
  patient: IPatient;
  pageTitle: string;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private patientService: PatientService,
    private _router: Router) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      name: [''],
      address: [''],
      temparature: ['']
    });

    this.route.paramMap.subscribe(params => {
      const patientId = +params.get('id');
      if (patientId) {
        this.pageTitle = 'Edit Patient';
        this.getPatient(patientId);
      } else {
        this.pageTitle = 'Create Patient';
        this.patient = {
          id: null,
          name: '',
          address: '',
          temparature: '',

        };
      }
    });

  }

  getPatient(id: number) {
    this.patientService.getPatient(id)
      .subscribe(
        (patient: IPatient) => {
          this.patient = patient;
          this.editPatient(patient);
        },
        (err: any) => console.log(err)
      );
  }
  editPatient(patient: IPatient) {
    this.patientForm.patchValue({
      name: patient.name,
      address: patient.address,
      temparature: patient.temparature
    });
  }
  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();

    if (this.patient.id) {
      this.patientService.updatePatient(this.patient).subscribe(
        () => this._router.navigate(['list']),
        (err: any) => console.log(err)
      );
    } else {
      this.patientService.addPatient(this.patient).subscribe(
        () => this._router.navigate(['list']),
        (err: any) => console.log(err)
      );
    }
  }
  mapFormValuesToEmployeeModel() {
    this.patient.name = this.patientForm.value.name;
    this.patient.address = this.patientForm.value.address,
    this.patient.temparature = this.patientForm.value.temparature     
  }

}
