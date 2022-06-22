import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SousTraitant } from './SousTraitant';

@Injectable({providedIn: 'any'})
export class SousTraitantService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient){}
  
  public getSTR(): Observable<SousTraitant[]> {
    return this.http.get<SousTraitant[]>(`${this.apiServerUrl}/SousTraitant//retrieve-all-STR`);
  }

  public updateSTR(sousTraitant: SousTraitant): Observable<SousTraitant> {
    return this.http.put<SousTraitant>(`${this.apiServerUrl}/SousTraitant/modify-STR`, sousTraitant );
  }

  public addSTR(sousTraitant: SousTraitant): Observable<SousTraitant> {
    return this.http.post<SousTraitant>(`${this.apiServerUrl}/SousTraitant/add-STR`, sousTraitant );
  }

  public deleteSTR(numsousTraitant: string | undefined = ''): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/SousTraitant/remove-STR/${numsousTraitant}`);
  }
}
