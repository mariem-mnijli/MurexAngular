import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatutConsultation } from './statut-consultation';
import { StatutConsultationService } from './statut-consultation.service';

@Component({
  selector: 'app-statut-consultation',
  templateUrl: './statut-consultation.component.html',
  styleUrls: ['./statut-consultation.component.css']
})
export class StatutConsultationComponent implements OnInit {

  public statutConsultations: StatutConsultation[] = [];
  public editStatutConsultation?: StatutConsultation;
  public deleteStatutConsultation?: StatutConsultation;

  constructor(private statutConsultationService: StatutConsultationService, private route: Router){
   
  }

  ngOnInit(): void {
    this.getStatutConsultations();
  }

  public getStatutConsultations(): void {
    this.statutConsultationService.findAll().subscribe(
      (response: StatutConsultation[]) => {
        this.statutConsultations = response;
        console.log(this.statutConsultations);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
        alert("you are not allowed");
        this.route.navigateByUrl('/home');
      }
    );
  }

  public onUpdateStatutConsultation(statutConsultation: StatutConsultation) {
    this.statutConsultationService.modifyStatutConsultation(statutConsultation).subscribe(
      (response: StatutConsultation) => {
        console.log(response);
        this.getStatutConsultations();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public onDeleteStatutConsultation(IDF_StatutConsultaion: number): void {
    this.statutConsultationService.deleteStatutConsultation(IDF_StatutConsultaion).subscribe(() => { this.getStatutConsultations() });
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
  public onOpenModal(statutConsultation: StatutConsultation, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editStatutConsultation = statutConsultation;
      button.setAttribute('data-target', '#updateStatutConsultationModal');
    }
    if (mode === 'delete') {
      this.deleteStatutConsultation = statutConsultation;
      button.setAttribute('data-target', '#deleteStatutConsultationModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
