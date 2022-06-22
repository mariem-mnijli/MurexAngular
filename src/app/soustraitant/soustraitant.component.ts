import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SousTraitant } from './SousTraitant';
import { SousTraitantService } from './SousTraitant.service';

@Component({
  selector: 'app-soustraitant',
  templateUrl: './soustraitant.component.html',
  styleUrls: ['./soustraitant.component.css']
})
export class SoustraitantComponent implements OnInit {

  public soustraitants!: SousTraitant[];
  public deleteSTR?: SousTraitant;
  public editSTR?: SousTraitant;
  

  constructor(private sousTraitantService: SousTraitantService, private route: Router) { }

  ngOnInit(): void {
    this.getSTR();
  }

  public getSTR(): void {
    this.sousTraitantService.getSTR().subscribe(
      (response: SousTraitant[]) => {
        this.soustraitants = response;
        console.log(this.soustraitants);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
        //this.route.navigateByUrl('/home');
      }
    );
  }

  public onUpdateSTR(sousTraitant: SousTraitant) {
    this.sousTraitantService.updateSTR(sousTraitant).subscribe(
      (response: SousTraitant) => {
        console.log(response);
        this.getSTR();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public onDeleteSTR(numsoustraitant: string | undefined = ''): void {
    this.sousTraitantService.deleteSTR(numsoustraitant).subscribe( 
      (response: void) => {
        console.log(response);
      this.getSTR();
     },
     (error: HttpErrorResponse) => {
       alert(error.message);
     }
   );
  }

  public onAddSTR(addForm: NgForm): void {
    document.getElementById('add-STR-form')!.click();
    this.sousTraitantService.addSTR(addForm.value).subscribe(
      (response: SousTraitant) => {
        console.error
        console.log(response);
        this.getSTR();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }


  public onOpenModal(sousTraitant: SousTraitant, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'edit') {
      this.editSTR = sousTraitant;
      button.setAttribute('data-target', '#updateSTRModal');
    }
    if (mode === 'delete') {
      this.deleteSTR = sousTraitant;
      button.setAttribute('data-target', '#deleteSTRModal');
    }
    if (mode === 'add') {

      button.setAttribute('data-target', '#addSTRModal');
    }
    container?.appendChild(button);
    button.click();
  }

}