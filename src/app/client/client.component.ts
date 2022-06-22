import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from './client';
import { ClientService } from './client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public clients: Client[] = [];
  public editClient?: Client;
  public deleteClient?: Client;

  constructor(private clientService: ClientService, private route: Router){
   
  }

  ngOnInit(): void {
    this.getClients();
  }

  public getClients(): void {
    this.clientService.getClients().subscribe(
      (response: Client[]) => {
        this.clients = response;
        console.log(this.clients);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
        alert("you are not allowed");
        this.route.navigateByUrl('/home');
      }
    );
  }

  public onAddClient(addForm: NgForm): void {
    document.getElementById('add-Client-form')!.click();
    this.clientService.save(addForm.value).subscribe(
      (response: Client) => {
        console.error
        console.log(response);
        this.getClients();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateClient(client: Client) {
    this.clientService.modifyClient(client).subscribe(
      (response: Client) => {
        console.log(response);
        this.getClients();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteClient(NumClient: number): void {
    this.clientService.deleteClient(NumClient).subscribe(() => { this.getClients() });
  }
  public onOpenModal(client: Client, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editClient = client;
      button.setAttribute('data-target', '#updateClientModal');
    }
    if (mode === 'delete') {
      this.deleteClient = client;
      button.setAttribute('data-target', '#deleteClientModal');
    }
    if (mode === 'add') {

      button.setAttribute('data-target', '#addClientModal');
    }
    container?.appendChild(button);
    button.click();
  }
}
