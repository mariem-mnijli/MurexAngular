import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    this.clientService.findAll().subscribe(
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
/*
 public searchUsers(key: string): void {
    console.log(key);
    const results: User[] = [];
    for (const user of this.users) {
      if (user.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
      || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
     alert("No user Found please try again");  
     this.users=[];
     const that=this;
     setTimeout(function () {
      that.getUsers() ; // here... this has different context
   }, 3000);


    }

  }
*/
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
    container?.appendChild(button);
    button.click();
  }
}
