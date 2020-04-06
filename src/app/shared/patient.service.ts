import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPatient } from '../models/patient.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {
  baseUrl = 'http://localhost:3000/patients';


  constructor(private httpClient: HttpClient) { }


  getPatients(): Observable<IPatient[]> {
    return this.httpClient.get<IPatient[]>(this.baseUrl);
  }

  getPatient(id: number): Observable<IPatient> {
    return this.httpClient.get<IPatient>(`${this.baseUrl}/${id}`)        
}

addPatient(patient: IPatient): Observable<IPatient> {
  return this.httpClient.post<IPatient>(this.baseUrl, patient, {
      headers: new HttpHeaders({
          'Content-Type': 'application/json'
      })
  })    
}

updatePatient(patient: IPatient): Observable<void> {
  return this.httpClient.put<void>(`${this.baseUrl}/${patient.id}`, patient);
}


  deletePatient(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)       
}


}












