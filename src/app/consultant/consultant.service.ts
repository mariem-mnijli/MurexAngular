import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Consultant } from './consultant';

@Injectable({providedIn: 'any'})
export class ConsultantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}
  
  public getConsultant(): Observable<Consultant[]> {
    return this.http.get<Consultant[]>(`${this.apiServerUrl}/Consultant//retrieve-all-Consultant`);
  }

  public updateConsultant(Consultant: Consultant): Observable<Consultant> {
    return this.http.put<Consultant>(`${this.apiServerUrl}/Consultant/modify-Consultant`, Consultant );
  }

  public addConsultant(Consultant: Consultant): Observable<Consultant> {
    return this.http.post<Consultant>(`${this.apiServerUrl}/Consultant/add-Consultant`, Consultant );
  }

  public deleteConsultant(numConsultant: string | undefined = ''): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/Consultant/remove-Consultant/${numConsultant}`);
  }
}
