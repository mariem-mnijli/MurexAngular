import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Consultant } from './consultant';
import { ConsultantService } from './consultant.service';
;

@Component({
  selector: 'app-consultant',
  templateUrl: './consultant.component.html',
  styleUrls: ['./consultant.component.css']
})
export class ConsultantComponent implements OnInit {

  public consultants!: Consultant[];
  public deleteConsultant?: Consultant;
  public editConsultant?: Consultant;
  

  constructor(private consultantService: ConsultantService, private route: Router) { }

  ngOnInit(): void {
    this.getConsultant();
  }

  public getConsultant(): void {
    this.consultantService.getConsultant().subscribe(
      (response: Consultant[]) => {
        this.consultants = response;
        console.log(this.consultants);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
        //this.route.navigateByUrl('/home');
      }
    );
  }

  public onUpdateConsultant(consultant: Consultant) {
    this.consultantService.updateConsultant(consultant).subscribe(
      (response: Consultant) => {
        console.log(response);
        this.getConsultant();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteConsultant(numConsultant: string | undefined = ''): void {
    this.consultantService.deleteConsultant(numConsultant).subscribe( 
      (response: void) => {
        console.log(response);
      this.getConsultant();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
  }

  public onAddConsultant(addForm: NgForm): void {
    document.getElementById('add-Consultant-form')!.click();
    this.consultantService.addConsultant(addForm.value).subscribe(
      (response: Consultant) => {
        console.error
        console.log(response);
        this.getConsultant();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onOpenModal(consultant: Consultant, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editConsultant = consultant;
      button.setAttribute('data-target', '#updateConsultantModal');
    }
    if (mode === 'delete') {
      this.deleteConsultant = consultant;
      button.setAttribute('data-target', '#deleteConsultantModal');
    }
    if (mode === 'add') {

      button.setAttribute('data-target', '#addConsultantModal');
    }
    container?.appendChild(button);
    button.click();
  }

}