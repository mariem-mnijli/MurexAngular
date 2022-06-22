import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Client } from './client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private clientUrl: string;

  constructor(private http: HttpClient) {
    this.clientUrl = 'http://localhost:8075/SpringMVC/client';
  }

  public getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientUrl+"/retrieve-all-clients");
  }
  

  
    public save(client: Client) {
    return this.http.post<Client>(this.clientUrl+"/add-client", client);
  }
 

  public modifyClient(client:Client):Observable<Client> {
    return this.http.put<Client>(this.clientUrl+"/modify-client", client);
  } 

  public deleteClient(NumClient: number): Observable<void> {
    return this.http.delete<void>(`${this.clientUrl+"/remove-client"}/${NumClient}`);
  }
}

